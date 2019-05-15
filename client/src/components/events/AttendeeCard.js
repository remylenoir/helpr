/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent_ACTION } from '../../actions/events';
import { getCurrentProfile_ACTION } from '../../actions/profile';

const AttendeeCard = ({ event, getEvent_ACTION, profile, user }) => {
  useEffect(() => {
    profile && getCurrentProfile_ACTION(user._id);
  }, []);

  useEffect(() => {
    event && getEvent_ACTION(event._id);
    profile && getCurrentProfile_ACTION(user._id);
  }, [profile]);

  const attendeeElement =
    event &&
    event.attendees.map(attendee => (
      <div key={attendee._id}>
        <h5>{attendee.username}</h5>
        <img src={attendee.profilePicture} alt='profile-pic' />
      </div>
    ));

  return <Fragment>{attendeeElement}</Fragment>;
};

AttendeeCard.propTypes = {
  getCurrentProfile_ACTION: PropTypes.func.isRequired,
  getEvent_ACTION: PropTypes.func.isRequired,
  event: PropTypes.object,
  profile: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  event: state.events.event,
  profile: state.profile.profile,
  user: state.auth.user,
  getCurrentProfile_ACTION: PropTypes.func.isRequired,
  getEvent_ACTION: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { getEvent_ACTION, getCurrentProfile_ACTION }
)(AttendeeCard);
