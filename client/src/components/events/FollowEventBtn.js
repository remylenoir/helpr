import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// Redux actions
import {
  addBookmarkEvent_ACTION,
  removeBookmarkEvent_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import { setAlert_ACTION } from '../../actions/alert';

const FollowEventBtn = ({
  profile,
  event,
  auth: { user, isAuthenticated },
  addBookmarkEvent_ACTION,
  removeBookmarkEvent_ACTION,
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
      setAlert_ACTION('Must be logged in', 'danger');
      return;
    }
    e.preventDefault();
    setClicked(!isClicked);
    addBookmarkEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Event successfully bookmarked', 'success');
  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    removeBookmarkEvent_ACTION(event._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Event successfully unbookmarked', 'success');
  };

  return (
    <Fragment>
      <div className='position-absolute bookmark'>
        {profile && event && profile.favEvents.filter(events => events._id === event._id).length > 0 ? (
          <div onClick={handleDelete} className={`${bookmarkClass} active`}>
            <i className='fas fa-bookmark active' />
          </div>
        ) : (
          <div onClick={handleBookmark} className={bookmarkClass}>
            <i className='far fa-bookmark' />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const bookmarkClass = 'bookmark-button d-flex flex-column justify-content-center align-items-center';

const mapStateToProps = state => ({
  auth: state.auth,
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
)(FollowEventBtn);
