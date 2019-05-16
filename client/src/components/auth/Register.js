import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FadeIn from 'react-fade-in';

// Redux action
import { setAlert_ACTION } from '../../actions/alert';
import { register_ACTION } from '../../actions/auth';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
      setAlert_ACTION('Passwords must match', 'danger');
      return;
    }

    register_ACTION({ username, password });
  };

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='auth-view d-flex align-items-center justify-content-center container'>
      <Row>
        <Container>
          <FadeIn>
            <h3 className='text-center'>
              Do you want to be part <br />
              of&nbsp;a&nbsp;great community?
            </h3>
            <p className='text-center'>Create your account</p>
            <hr />

            <Form onSubmit={onSubmit}>
              <Form.Group controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  value={username}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group controlId='formPassword2'>
                <Form.Label>Confirm your password</Form.Label>
                <Form.Control
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                />
              </Form.Group>
              <Button type='submit' variant='primary btn-block'>
                Submit
              </Button>
              <hr />
              <p className='text-center'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </Form>
          </FadeIn>
        </Container>
      </Row>
    </div>
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
