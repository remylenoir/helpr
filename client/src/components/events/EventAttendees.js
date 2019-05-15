import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AttendeeCard from './AttendeeCard';

const EventAttendees = ({ event, user }) => {
  const userContent = (
    <Fragment>
      {event && event.attendees.length === 1 ? (
        <h3>Attendee ({event && event.attendees.length}) </h3>
      ) : (
        <h3>Attendees ({event && event.attendees.length}) </h3>
      )}
      <AttendeeCard />
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      {event && event.attendees.length === 1 ? (
        <h3>Attendee ({event && event.attendees.length}) </h3>
      ) : (
        <h3>Attendees ({event && event.attendees.length}) </h3>
      )}
      <h5>
        <Link to='/login'>Log in</Link> to see the list of attendees
      </h5>
    </Fragment>
  );

  return (
    <div>
      {user ? userContent : guestContent}
    </div>
  );
};

EventAttendees.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  event: state.events.event,
  user: state.auth.user
});

export default connect(mapStateToProps)(EventAttendees);
