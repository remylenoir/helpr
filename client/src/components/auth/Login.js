import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login_ACTION } from '../../actions/auth';

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
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <p>Sign Into Your Account</p>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <input type='submit' value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login_ACTION: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { login_ACTION }
)(Login);
