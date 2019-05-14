import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  addBookmarkEvent_ACTION,
  removeBookmarkEvent_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import {setAlert_ACTION} from '../../actions/alert';
import Spinner from '../layout/Spinner';

const FollowAlertBtn = ({
  profile,
  event,
  user,
  addBookmarkEvent_ACTION,
  removeBookmarkEvent_ACTION,
  getCurrentProfile_ACTION, setAlert_ACTION
}) => {
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    getCurrentProfile_ACTION(user._id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked]);

  const handleBookmark = e => {
    e.preventDefault();
    setClicked(!isClicked);
    addBookmarkEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Event successfully bookmarked')

  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    removeBookmarkEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Event successfully unbookmarked')
  };

  return (
    <Fragment>
      {profile &&
      profile.favEvents.filter(events => events._id === event._id).length >
        0 ? (
        <button onClick={handleDelete}>Unbookmark Event</button>
      ) : (
        <button onClick={handleBookmark}>Bookmark Event</button>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  event: state.events.event,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    addBookmarkEvent_ACTION,
    removeBookmarkEvent_ACTION,
    getCurrentProfile_ACTION,
    setAlert_ACTION
  }
)(FollowAlertBtn);
