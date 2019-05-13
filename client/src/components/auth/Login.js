import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login_ACTION } from '../../actions/auth';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
    <Container>
      <Row className='vh-100 align-items-center'>
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
    </Container>
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
