import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editCurrentProfile_ACTION,
  uploadCurrentProfilePicture_ACTION
} from '../../actions/profile';
import { setAlert_ACTION } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import Image from 'react-bootstrap/Image';

const EditProfile = ({
  id,
  user,
  loading,
  edit,
  editCurrentProfile_ACTION,
  setAlert_ACTION,
  uploadCurrentProfilePicture_ACTION
}) => {
  // Set the state to handle edit form input values
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    profilePicture: ''
  });

  const { username, firstName, lastName, profilePicture } = formData;

  useEffect(() => {
    //If the profile data is not loaded set its value to '', otherwise set it to its corresponding value from the store
    setFormData({
      username: loading || !user ? '' : user.username,
      firstName: loading || !user ? '' : user.firstName,
      lastName: loading || !user ? '' : user.lastName,
      profilePicture: loading || !user ? '' : user.profilePicture
    });
  }, [loading, user]);

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  //profile pic upload
  const onUpload = e => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('profilePicture', file);

    uploadCurrentProfilePicture_ACTION(data);
  };

  const onSubmit = e => {
    e.preventDefault();
    // Set error message when any of the inputs is not filled
    if (username === '' || firstName === '' || lastName === '') {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    // Send edit action to reducer and display success message
    editCurrentProfile_ACTION(user._id, formData);
    setAlert_ACTION('Changes have been saved');
  };

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div>
      <Fragment>
        <form onSubmit={onSubmit}>
          <div className='image-edit'>
            <label for='profileImg'>
              <span className='edit-title'>Edit image</span>
              <Image src={user.profilePicture} />
            </label>
            <input
              type='file'
              id='profileImg'
              name='profilePicture'
              onChange={onUpload}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={username}
              onChange={onChange}
            />
          </div>
          <div>
            <label>First name:</label>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
          </div>
          <input type='submit' value='Save changes' />
        </form>
        <Link to='/profile'>Back to profile</Link>
      </Fragment>
    </div>
  );
};

EditProfile.propTypes = {
  editCurrentProfile_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired,
  id: PropTypes.string,
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  id: state.auth.user._id,
  user: state.profile.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  {
    editCurrentProfile_ACTION,
    setAlert_ACTION,
    uploadCurrentProfilePicture_ACTION
  }
)(EditProfile);
