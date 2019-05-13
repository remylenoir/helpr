import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert_ACTION } from '../../actions/alert';
import {
  getEvent_ACTION,
  editEvent_ACTION,
  deleteEvent_ACTION
} from '../../actions/events';
import Spinner from '../layout/Spinner';

const EventDetails = ({
  match: {
    params: { eventId }
  },
  events: { event, date, location, edit, loading, isDeleted },
  auth,
  getEvent_ACTION,
  editEvent_ACTION,
  deleteEvent_ACTION,
  setAlert_ACTION
}) => {
  // Set the state to handle edit form toggle
  const [displayEdit, editToggle] = useState(false);

  // Set the state to handle edit form input values
  const [formData, setFormData] = useState({
    title: '',
    fullDesc: '',
    date: '',
    location: '',
    coverImage: ''
  });

  const { title, fullDesc, categories, coverImage, organizer } = formData;

  useEffect(() => {
    // Get event info by ID when component mounts
    getEvent_ACTION(eventId);

    // On loading and/or edit state value change
    //If the event data is not loaded set its value to '', otherwise set it to its corresponding value from the store
    setFormData({
      title: loading || !event.title ? '' : event.title,
      fullDesc: loading || !event.fullDesc ? '' : event.fullDesc,
      date: loading || !date ? '' : date,
      location: loading || !location ? '' : location,
      coverImage: loading || !event.coverImage ? '' : event.coverImage
    });
  }, [edit]);

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
    if (
      title === '' ||
      fullDesc === '' ||
      date === '' ||
      location === '' ||
      categories === '' ||
      coverImage === '' ||
      organizer === ''
    ) {
      
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    // Toggle edit form off and send edit action to reducer
    editToggle(false);
    editEvent_ACTION(eventId, formData);
  };

  const deleteHandler = e => {
    e.preventDefault();

    //Send delete action to reducer
    deleteEvent_ACTION(eventId);
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
          <h2>{event && event.title}</h2>
          <p>Description: {event && event.fullDesc}</p>
          <p>Date: {date && date}</p>
          <p>
            Location: {location && location[0]}, {location && location[1]}
          </p>
          <p>
            Images: <img src={event && event.coverImage} alt='event pic' />
          </p>
          <br />
          <button onClick={() => editToggle(!displayEdit)}>Edit event</button>
          <button onClick={deleteHandler}>Delete event</button>
          <br />
          <a href='#!'>See all events</a>
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
              <label>Description</label>
              <input
                type='text'
                name='fullDesc'
                value={fullDesc}
                onChange={onChange}
              />
            </div>
            <div>
              <label>Date</label>
              <input type='text' name='date' value={date} onChange={onChange} />
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
              <label>Cover Image</label>
              <input
                type='text'
                name='coverImage'
                value={coverImage}
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
      <h2>{event && event.title}</h2>
      <p>Description: {event && event.fullDesc}</p>
      <p>Date: {date && date}</p>
      <p>
        Location: {location && location[0]}, {location && location[1]}
      </p>
      <p>
        Images: <img src={event && event.coverImage} alt='event pic' />
      </p>
      <br />
      <a href='#!'>See all events</a>
    </Fragment>
  );

  // If alert info is still being fetched display spinner
  return loading && event === null ? (
    <Spinner />
  ) : (
    <div>
      {/* If user is logged in and is the creator of the event display creatorContent */}
      {auth.isAuthenticated && auth.user._id === event.creator
        ? creatorContent
        : guestContent}
    </div>
  );
};

// EventDetails.propTypes = {
//   alerts: PropTypes.object,
//   auth: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
//   getAlert_ACTION: PropTypes.func.isRequired,
//   setAlert_ACTION: PropTypes.func.isRequired,
//   editAlert_ACTION: PropTypes.func.isRequired,
//   deleteAlert_ACTION: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvent_ACTION, editEvent_ACTION, deleteEvent_ACTION, setAlert_ACTION }
)(EventDetails);
