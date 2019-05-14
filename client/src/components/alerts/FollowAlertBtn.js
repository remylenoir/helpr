import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import { setAlert_ACTION } from '../../actions/alert';
import Spinner from '../layout/Spinner';

const FollowAlertBtn = ({
  profile,
  alert,
  user,
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
  getCurrentProfile_ACTION,
  setAlert_ACTION
}) => {
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    getCurrentProfile_ACTION(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked]);

  const handleBookmark = e => {
    e.preventDefault();
    setClicked(!isClicked);
    addBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Alert successfully bookmarked');
  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    removeBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
    setAlert_ACTION('Alert successfully unbookmarked');
  };

  return (
    <Fragment>
      <div className='position-absolute bookmark'>
        {profile && profile.favAlerts.filter(alerts => alerts._id === alert._id).length > 0 ? (
          <button onClick={handleDelete} className={`${bookmarkClass} active`}>
            <i className='fas fa-bookmark active' />
          </button>
        ) : (
          <button onClick={handleBookmark} className={bookmarkClass}>
            <i className='fas fa-bookmark' />
          </button>
        )}
      </div>
    </Fragment>
  );
};

const bookmarkClass = 'bookmark-button d-flex flex-column justify-content-center align-items-center';

const mapStateToProps = state => ({
  user: state.auth.user,
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
