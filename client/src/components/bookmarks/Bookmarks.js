/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BookmarkedEventPrev from './BookmarkedEventPrev';
import { connect } from 'react-redux';
import { getCurrentProfile_ACTION } from '../../actions/profile';
import BookmarkedAlertPrev from './BookmarkedAlertPrev';

const Bookmarks = ({ user, getCurrentProfile_ACTION }) => {
  useEffect(() => {
    getCurrentProfile_ACTION(user._id);
  }, []);
  return (
    <div>
      <h1>Your bookmarks</h1>
      <br />
      <h2>Bookmarked Alerts</h2>
      <br />
      <BookmarkedAlertPrev />
      <br />
      <h2>Bookmarked Events</h2>
      <br />
      <BookmarkedEventPrev />
    </div>
  );
};

Bookmarks.propTypes = {
  getCurrentProfile_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getCurrentProfile_ACTION }
)(Bookmarks);
