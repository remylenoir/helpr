import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert_ACTION } from '../../actions/alert';
import {
  getAlert_ACTION,
  editAlert_ACTION,
  deleteAlert_ACTION
} from '../../actions/alerts';
import Spinner from '../layout/Spinner';

const AlertDetails = ({
  match: {
    params: { alertId }
  },
  alerts: { alert, edit, isDeleted, location, loading },
  auth,
  getAlert_ACTION,
  editAlert_ACTION,
  deleteAlert_ACTION,
  setAlert_ACTION
}) => {
  // Set the state to handle edit form toggle
  const [displayEdit, editToggle] = useState(false);

  // Set the state to handle edit form input values
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    imageURL: ''
  });

  const { title, type, description, imageURL } = formData;

  useEffect(() => {
    // Get alert info by ID when component mounts
    getAlert_ACTION(alertId);

    // On loading and/or edit state value change
    //If the alert data is not loaded set its value to '', otherwise set it to its corresponding value from the store
    setFormData({
      title: loading || !alert.title ? '' : alert.title,
      type: loading || !alert.type ? '' : alert.type,
      description: loading || !alert.description ? '' : alert.description,
      imageURL: loading || !alert.imageURL ? '' : alert.imageURL
    });
  }, [loading, edit]);

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    // Set error message when any of the inputs is not filled
    if (title === '' || type === '' || description === '' || imageURL === '') {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    // Toggle edit form off and send edit action to reducer
    editToggle(false);
    editAlert_ACTION(alertId, formData);
  };

  const deleteHandler = e => {
    e.preventDefault();

    //Send delete action to reducer
    deleteAlert_ACTION(alertId);
  };

  // If alert is deleted redirect to dashboard
  if (isDeleted) {
    return <Redirect to='/dashboard' />;
  }

  const creatorContent = (
    <Fragment>
      {/* If edit toggle is false display alert details, else display edit form */}
      {!displayEdit ? (
        // Alert details
        <Fragment>
          <h2>{alert && alert.title}</h2>
          <p>Type of alert: {alert && alert.type}</p>
          <p>Description: {alert && alert.description}</p>
          <p>
            Location: {location && location[0]}, {location && location[1]}
          </p>
          <p>
            Images: <img src={alert && alert.imageURL} alt='alert pic' />
          </p>
          <br />
          <button onClick={() => editToggle(!displayEdit)}>Edit alert</button>
          <button onClick={deleteHandler}>Delete Alert</button>
          <br />
          <a href='#!'>See all alerts</a>
        </Fragment>
      ) : (
        // Edit form
        <Fragment>
          <form onSubmit={onSubmit}>
            <div>
              <label>Title</label>
              <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
              />
            </div>
            <div>
              <label>Type</label>
              {/* <input type='text' 
              name='type' 
              value={type} 
              onChange={onChange} 
              /> */}
              <select name='type'>
                <option value={type}>People in need</option>
                <option value={type}>Places</option>
                <option value={type}>Other</option>
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
              <label>Image</label>
              <input
                type='text'
                name='imageURL'
                value={imageURL}
                onChange={onChange}
              />
            </div>
            <input type='submit' value='Confirm Edit' />
          </form>
          <button onClick={() => editToggle(!displayEdit)}>Edit alert</button>
        </Fragment>
      )}
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      <h2>{alert && alert.title}</h2>
      <p>Type of alert: {alert && alert.type}</p>
      <p>Description: {alert && alert.description}</p>
      <p>
        Location: {location && location[0]}, {location && location[1]}
      </p>
      <p>
        Images: <img src={alert && alert.imageURL} alt='alert pic' />
      </p>
      <br />
      <a href='#!'>See all alerts</a>
    </Fragment>
  );

  // If alert info is still being fetched display spinner
  return loading && alert === null ? (
    <Spinner />
  ) : (
    <div>
      {/* If user is logged in and is the creator of the event display creatorContent */}
      {auth.isAuthenticated && auth.user._id === alert.creator._id
        ? creatorContent
        : guestContent}
    </div>
  );
};

AlertDetails.propTypes = {
  alerts: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getAlert_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired,
  editAlert_ACTION: PropTypes.func.isRequired,
  deleteAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAlert_ACTION, editAlert_ACTION, deleteAlert_ACTION, setAlert_ACTION }
)(AlertDetails);
