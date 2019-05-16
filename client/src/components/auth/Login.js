import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// Redux action
import { login_ACTION } from '../../actions/auth';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
    <div className='auth-view d-flex align-items-center justify-content-center container'>
      <Row>
        <Container>
          <h3 className='text-center'>It's good to see you again</h3>
          <p className='text-center'>Sign into your account</p>
          <hr />

          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='username' value={username} onChange={onChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={password} onChange={onChange} />
            </Form.Group>
            <Button type='submit' variant='primary btn-block'>
              Submit
            </Button>
            <hr />
            <p className='text-center'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </Form>
        </Container>
      </Row>
    </div>
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
