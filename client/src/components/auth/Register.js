import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert_ACTION } from '../../actions/alert';
import { register_ACTION } from '../../actions/auth';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = ({ setAlert_ACTION, register_ACTION, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const { username, password, password2 } = formData;

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert_ACTION('Passwords must match');
      return;
    }

    register_ACTION({ username, password });
  };

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h3>Sign Up</h3>
      <p>
        Create your account. <br />
        <small>
          <em>All fields are mandatory</em>
        </small>
      </p>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' name='username' value={username} onChange={onChange} />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={password} onChange={onChange} />
        </Form.Group>

        <Form.Group controlId='formPassword2'>
          <Form.Label>Confirm your password</Form.Label>
          <Form.Control type='password' name='password2' value={password2} onChange={onChange} />
        </Form.Group>

        <Button color='primary' type='submit'>
          Submit
        </Button>

        <hr />

        <p>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </Form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert_ACTION: PropTypes.func.isRequired,
  register_ACTION: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert_ACTION, register_ACTION }
)(Register);
