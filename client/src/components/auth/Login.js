import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login_ACTION } from '../../actions/auth';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ login_ACTION, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    login_ACTION({ username, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <p>Sign Into Your Account</p>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Button color='primary' type='submit'>
          Submit
        </Button>
      </Form>

      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login_ACTION: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login_ACTION }
)(Login);
