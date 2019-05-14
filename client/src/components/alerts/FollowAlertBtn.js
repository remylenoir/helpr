import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
// import { bookmarkAlert_ACTION } from '../../actions/alerts';
import {
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
  getCurrentProfile_ACTION
} from '../../actions/profile';
import Spinner from '../layout/Spinner';

const FollowAlertBtn = ({
  profile,
  alert,
  user,
  addBookmarkAlert_ACTION,
  removeBookmarkAlert_ACTION,
  getCurrentProfile_ACTION
}) => {
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    getCurrentProfile_ACTION(user._id)
  }, [isClicked])

  const handleBookmark = e => {
    e.preventDefault();
    setClicked(!isClicked);
    addBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
  };

  const handleDelete = e => {
    e.preventDefault();
    setClicked(!isClicked);
    removeBookmarkAlert_ACTION(alert._id);
    getCurrentProfile_ACTION(user._id);
  };
  console.log(profile.favAlerts);
  return (
    <Fragment>
      {profile && profile.favAlerts.filter(alerts => alerts._id === alert._id).length > 0 ? (
        <button onClick={handleDelete}>Unbookmark Alert</button>
      ) : (
        <button onClick={handleBookmark}>Bookmark Alert</button>
      )}

      {/* { profile && bookmarkedAlert[0]._id === alert._id ?
      <button onClick={handleBookmark}>Unbookmark Alert</button> :
      <button onClick={handleBookmark}>Bookmark Alert</button>} */}
    </Fragment>
  );
};

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
    getCurrentProfile_ACTION
  }
)(FollowAlertBtn);
