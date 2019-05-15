import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent_ACTION } from '../../actions/events';
import Spinner from '../layout/Spinner';
import FollowEventBtn from './FollowEventBtn';
import JoinEventBtn from './JoinEventBtn';

const EventDetails = ({
  match: {
    params: { eventId }
  },
  events: { event, date, location, loading },
  auth,
  getEvent_ACTION
}) => {
  useEffect(() => {
    getEvent_ACTION(eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If alert info is still being fetched display spinner
  return loading && event === null ? (
    <Spinner />
  ) : (
    <div>
      <FollowEventBtn />
      <JoinEventBtn />
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
      {event && auth.isAuthenticated && auth.user._id === event.creator ?
        <Link to={`/event/${event._id}/edit`}>Edit event</Link> : <Fragment></Fragment> }
      
      <br />
      <Link to='/event/all'>See all events</Link>
    </div>
  );
};

EventDetails.propTypes = {
  events: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getEvent_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvent_ACTION }
)(EventDetails);
