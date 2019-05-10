import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    const response = await service.post('/auth/login', { username, password });
    const login = await service.get('/auth/loggedin');
    login ? console.log(login.data) : console.log('unauthorized')
  };

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

export default Login;
