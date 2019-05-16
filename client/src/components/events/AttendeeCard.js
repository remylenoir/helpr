/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { getEvent_ACTION } from '../../actions/events';
import { getCurrentProfile_ACTION } from '../../actions/profile';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

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
    event.attendees.map(attendee => {
      return (
        <Card key={attendee._id} className='align-items-center'>
          <Card.Body>
            <Image variant='top' src={attendee.profilePicture} className='attendee-profile' />
            <Card.Subtitle className='my-2 text-muted text-center'>{attendee.username}</Card.Subtitle>
          </Card.Body>
        </Card>
      );
    });

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
