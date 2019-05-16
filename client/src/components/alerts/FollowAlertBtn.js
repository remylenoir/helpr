import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

// Redux actions
import {
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import { setAlert_ACTION } from '../../actions/alert';

const FollowAlertBtn = ({
  profile,
  alert,
  auth: { user, isAuthenticated },
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
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
    addBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Alert successfully bookmarked', 'success');
  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    removeBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Alert successfully unbookmarked', 'success');
  };

  return (
    <Fragment>
      <div className='position-absolute bookmark'>
        {profile && alert && profile.favAlerts.filter(alerts => alerts._id === alert._id).length > 0 ? (
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
  alert: state.alerts.alert,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    addBookmarkAlert_ACTION,
    removeBookmarkAlert_ACTION,
    getCurrentProfile_ACTION,
    setAlert_ACTION
  }
)(FollowAlertBtn);
