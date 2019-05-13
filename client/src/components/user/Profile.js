import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Profile = ({
  user: { username, firstName, lastName, profilePicture },
  loading,
  user
}) => {
  // Set the state to handle edit form toggle

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div>
      <p>Username: {username}</p>
      <p>Firstname: {firstName}</p>
      <p>Lastname: {lastName}</p>
      <img src={profilePicture} alt='profile-pic' />
      <br />
      <Link to='/profile/edit'>Edit profile</Link>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.profile.profile,
  loading: state.profile
});

export default connect(mapStateToProps)(Profile);
