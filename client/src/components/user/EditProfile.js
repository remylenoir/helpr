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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OurFontAwesome from '../layout/OurFontAwesome';

const EditProfile = ({
  id,
  user,
  loading,
  edit,
  history,
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

  const { username, firstName, lastName } = formData;

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

    setFormData({
      ...formData,
      profilePicture: user.profilePicture
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    // Set error message when any of the inputs is not filled
    if (username === '' || firstName === '' || lastName === '') {
      setAlert_ACTION('All inputs must be filled');
      return;
    }
    //Check if user didn't change anything, then do nothing
    if (
      username === user.username &&
      firstName === user.firstName &&
      lastName === user.lastName
    ) {
      return;
    }

    // Send edit action to reducer and display success message
    editCurrentProfile_ACTION(user._id, formData);
    setAlert_ACTION('Changes have been saved');

    history.push('/profile');
  };

  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <div id='profile'>
              <Link to='/profile'>
                <OurFontAwesome icon={'fa-arrow-left'} /> Back to profile
              </Link>
              <Form onSubmit={onSubmit}>
                <div className='image-edit'>
                  <Form.Label
                    htmlFor='profileImg'
                    className='profile-img-holder'
                  >
                    <span className='edit-title'>Edit image</span>
                    <Image src={user.profilePicture} className='profile-img' />
                  </Form.Label>
                  <input
                    type='file'
                    id='profileImg'
                    name='profilePicture'
                    onChange={onUpload}
                  />
                </div>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    placeholder={user.username}
                    type='text'
                    name='username'
                    value={username}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>First name:</Form.Label>
                  <Form.Control
                    placeholder={user.firstName}
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last name:</Form.Label>
                  <Form.Control
                    placeholder={user.lastName}
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={onChange}
                  />
                </Form.Group>
                <Button type='submit' variant='primary btn-block'>
                  Update
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
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
