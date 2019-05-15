import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// Redux actions
import { setAlert_ACTION } from '../../actions/alert';
import { joinEvent_ACTION, leaveEvent_ACTION, getCurrentProfile_ACTION } from '../../actions/profile';

const JoinEventBtn = ({
  profile,
  event,
  auth: { user, isAuthenticated },
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
      setAlert_ACTION('Must be logged in');
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
      {/* {profile && event && profile.joinedEvents.filter(events => events._id === event._id).length > 0 ? (
        <button onClick={handleDelete}>Leave Event</button>
      ) : (
        <button onClick={handleBookmark}>Join Event</button>
      )} */}
      <div className='position-absolute join'>
        {profile &&
        event &&
        profile.joinedEvents.filter(events => events._id === event._id).length > 0 ? (
          <div onClick={handleDelete} className={`${bookmarkClass} active`}>
            <i className='fas fa-calendar-plus active' />
          </div>
        ) : (
          <div onClick={handleBookmark} className={bookmarkClass}>
            <i className='far fa-calendar-plus' />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const bookmarkClass = 'join-button d-flex flex-column justify-content-center align-items-center';

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
