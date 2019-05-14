import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEvent_ACTION, deleteEvent_ACTION } from '../../actions/events';
import { setAlert_ACTION } from '../../actions/alert';
import Spinner from '../layout/Spinner';

const EditEvent = ({
  events: { event, date, location, loading, isDeleted },
  editEvent_ACTION,
  deleteEvent_ACTION,
  setAlert_ACTION
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    fullDesc: '',
    location: '',
    coverImage: ''
  });

  const { title, fullDesc, coverImage } = formData;

  useEffect(() => {
    setFormData({
      title: loading || !event.title ? '' : event.title,
      fullDesc: loading || !event.fullDesc ? '' : event.fullDesc,
      date: loading || !date ? '' : date,
      location: loading || !location ? '' : location,
      coverImage: loading || !event.coverImage ? '' : event.coverImage
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      fullDesc === '' ||
      date === '' ||
      location === '' ||
      coverImage === ''
    ) {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    editEvent_ACTION(event._id, formData);
    setAlert_ACTION('Changes have been saved');
  };

  const handleDelete = e => {
    e.preventDefault();

    //Send delete action to reducer
    deleteEvent_ACTION(event._id);
  };

  if (isDeleted) {
    return <Redirect to='/dashboard' />;
  }

  return loading && event === null ? (
    <Spinner />
  ) : (
    <div>
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input type='text' name='title' value={title} onChange={onChange} />
          </div>
          <div>
            <label>Description</label>
            <input
              type='text'
              name='description'
              value={fullDesc}
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
          <input type='submit' value='Confirm Edit' />
        </form>
        <Link to={`/event/${event._id}`}>Back to event details</Link>
        <button onClick={handleDelete}>Delete event</button>
      </Fragment>
    </div>
  );
};

EditEvent.propTypes = {
  events: PropTypes.object,
  editEvent_ACTION: PropTypes.func.isRequired,
  deleteEvent_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { editEvent_ACTION, deleteEvent_ACTION, setAlert_ACTION }
)(EditEvent);
