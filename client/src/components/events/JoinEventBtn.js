import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  joinEvent_ACTION,
  leaveEvent_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import { setAlert_ACTION } from '../../actions/alert';

const JoinEventBtn = ({
  profile,
  event,
  auth: {user, isAuthenticated},
  joinEvent_ACTION,
  leaveEvent_ACTION,
  getCurrentProfile_ACTION,
  setAlert_ACTION
}) => {
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    
    user && getCurrentProfile_ACTION(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked]);

  const handleBookmark = e => {
    if (isAuthenticated === null) {
      setAlert_ACTION('Must be logged in')
      return;
    }
    e.preventDefault();
    setClicked(!isClicked);
    joinEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Successfully joined event');
  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    leaveEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Successfully left event');
  };

  return (
    <Fragment>
      {profile &&
      event &&
      profile.joinedEvents.filter(events => events._id === event._id).length >
        0 ? (
        <button onClick={handleDelete}>Leave Event</button>
      ) : (
        <button onClick={handleBookmark}>Join Event</button>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.events.event,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    joinEvent_ACTION,
    leaveEvent_ACTION,
    getCurrentProfile_ACTION,
    setAlert_ACTION
  }
)(JoinEventBtn);
