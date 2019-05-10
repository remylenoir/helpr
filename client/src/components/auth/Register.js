import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const service = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
  });

const Register = () => {
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
    console.log(formData)
    const response = await service.post('/auth/signup', { username, password })
    console.log(response);
  };

  return (
    <Fragment>
      <h1>Sign Up</h1>
      <p>Create Your Account</p>
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
        <div>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Register' />
      </form>
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
