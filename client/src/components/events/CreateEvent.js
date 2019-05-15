import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent_ACTION } from '../../actions/events';
import { setAlert_ACTION } from '../../actions/alert';

const CreateEvent = ({
  auth: { user },
  events,
  createEvent_ACTION,
  setAlert_ACTION
}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    fullDesc: '',
    coverImage: '',
    shortDesc: '',
  });

  if (events && events.isCreated) {
    return <Redirect to='/dashboard' />;
  }

  const { title, date, location, fullDesc, shortDesc, coverImage } = formData;

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      title === '' ||
      date === '' ||
      location === '' ||
      fullDesc === '' ||
      shortDesc === '' ||
      coverImage === ''
    ) {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    createEvent_ACTION(formData, user._id);
    setAlert_ACTION('Event successfully created');
  };

  return (
    <div>
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input type='text' name='title' value={title} onChange={onChange} />
          </div>
          <div>
            <label>Date</label>
            <input type='text' name='date' value={date || ''} onChange={onChange} />
          </div>
          <div>
            <label>Location</label>
            <input
              type='text'
              name='location'
              value={location}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type='text'
              name='fullDesc'
              value={fullDesc}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Short Description</label>
            <input
              type='text'
              name='shortDesc'
              value={shortDesc}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type='text'
              name='coverImage'
              value={coverImage}
              onChange={onChange}
            />
          </div>
          <input type='submit' value='Create Alert' />
        </form>
      </Fragment>
    </div>
  );
};

CreateEvent.propTypes = {
  auth: PropTypes.object,
  events: PropTypes.object,
  createEvent_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});

export default connect(
  mapStateToProps,
  { createEvent_ACTION, setAlert_ACTION }
)(CreateEvent);
