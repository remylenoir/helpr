import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAlert_ACTION } from '../../actions/alerts';
import { setAlert_ACTION } from '../../actions/alert';

const CreateAlert = ({
  auth: { user },
  alerts,
  createAlert_ACTION,
  setAlert_ACTION
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'People in need',
    location: '',
    description: '',
    imageURL: ''
  });

  if (alerts && alerts.isCreated) {
    return <Redirect to='/dashboard' />
  }

  const { title, type, location, description, imageURL } = formData;

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
      description === '' ||
      location === '' ||
      imageURL === ''
    ) {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    createAlert_ACTION(formData, user._id);
    setAlert_ACTION('Alert successfully created');
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
            <select name='type'>
              <option value={type} onChange={onChange}>
                People in need
              </option>
              <option value={type} onChange={onChange}>
                Places
              </option>
              <option value={type} onChange={onChange}>
                Other
              </option>
            </select>
          </div>
          <div>
            <label>Description</label>
            <input
              type='text'
              name='description'
              value={description}
              onChange={onChange}
            />
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
            <label>Image</label>
            <input
              type='text'
              name='imageURL'
              value={imageURL}
              onChange={onChange}
            />
          </div>
          <input type='submit' value='Create Alert' />
        </form>
      </Fragment>
    </div>
  );
};

CreateAlert.propTypes = {
  auth: PropTypes.object,
  alerts: PropTypes.object,
  createAlert_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  alerts: state.alerts,
});

export default connect(
  mapStateToProps,
  { createAlert_ACTION, setAlert_ACTION }
)(CreateAlert);
