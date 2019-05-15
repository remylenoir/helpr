import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import AttendeeCard from './AttendeeCard';

const EventAttendees = ({ event, user }) => {
  const userContent = (
    <Fragment>
      <AttendeeCard />
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      <p className='m-0'>
        <Link to='/login'>Log in</Link> to see the list of attendees
      </p>
    </Fragment>
  );

  return (
    <Fragment>
      {event && event.attendees.length === 1 ? (
        <h3>Attendee ({event && event.attendees.length}) </h3>
      ) : (
        <h3>Attendees ({event && event.attendees.length}) </h3>
      )}
      <div className='attendees d-flex'>{user ? userContent : guestContent}</div>
    </Fragment>
  );
};

EventAttendees.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  event: state.events.event,
  user: state.auth.user
});

export default connect(mapStateToProps)(EventAttendees);
