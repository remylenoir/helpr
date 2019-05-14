import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_ACTION } from '../../actions/auth';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout_ACTION }) => {
  const authLinks = (
    <Fragment>
      <button
        className='btn btn-outline-dark dropdown-toggle d-flex align-items-center user-dropdown'
        type='button'
        id='dropdown-user'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <Container>
          <Row className='align-items-center'>
            <div className='col text-right user-name'>{user && user.username}</div>
            <div className='pr-2'>
              <Image
                src='https://source.unsplash.com/random'
                width='35'
                height='35'
                className='border'
                roundedCircle
              />
            </div>
          </Row>
        </Container>
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <Link to='/dashboard' className='dropdown-item'>
          Dashboard
        </Link>
        <Link to='/profile' className='dropdown-item'>
          Settings
        </Link>
        <div className='dropdown-divider' />
        <Link onClick={logout_ACTION} to='/dashboard' className='dropdown-item'>
          Logout
        </Link>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <button
        className='btn btn-outline-dark dropdown-toggle user-dropdown'
        type='button'
        id='dropdown-guest'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        Login / register
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <Link to='/login' className='dropdown-item'>
          Login
        </Link>
        <div className='dropdown-divider' />
        <Link to='/register' className='dropdown-item'>
          Register
        </Link>
      </div>
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand='true' bg='light'>
      <Link to='/'>Helpr.</Link>

      <div className='dropdown'>{isAuthenticated ? authLinks : guestLinks}</div>
    </Navbar>
  );
};

NavBar.propTypes = {
  logout_ACTION: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout_ACTION }
)(NavBar);
