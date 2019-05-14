import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
// import { bookmarkAlert_ACTION } from '../../actions/alerts';
import { checkBookmark_ACTION, getCurrentProfile_ACTION, bookmarkAlert_ACTION } from '../../actions/profile'
import Spinner from '../layout/Spinner';

const FollowAlertBtn = ({
  user: { favAlerts, alertBookmarked },
  profile,
  alert,
  bookmarkAlert_ACTION,
  checkBookmark_ACTION, 
  getCurrentProfile_ACTION
}) => {
  const [isClicked, setClicked] = useState(false)

  const handleBookmark = e => {
    e.preventDefault();
    bookmarkAlert_ACTION(alert._id);
    // checkBookmark_ACTION(alert._id)
    setClicked(!isClicked)
  };

  useEffect(() => {
    checkBookmark_ACTION(alert._id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertBookmarked])

  return (
    <Fragment>
      { profile && !profile.alertBookmarked ?
      <button onClick={handleBookmark}>Bookmark Alert</button> :
      <button onClick={handleBookmark}>Unbookmark Alert</button>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  alert: state.alerts.alert,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { bookmarkAlert_ACTION, checkBookmark_ACTION, getCurrentProfile_ACTION }
)(FollowAlertBtn);
