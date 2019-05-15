import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout_ACTION } from '../../actions/auth';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout_ACTION }) => {
  const authLinks = (
    <Fragment>
      <button
        className={navbarClass}
        type='button'
        id='dropdown-user'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <Container>
          <Row className='align-items-center'>
            <div className='col text-right user-name pr-1'>{user && user.username}</div>
          </Row>
        </Container>
      </button>
      <div className='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenuButton'>
        <Link to='/dashboard' className='dropdown-item'>
          Dashboard
        </Link>
        <Link to='/profile' className='dropdown-item'>
          Settings
        </Link>
        <div className='dropdown-divider' />
        <Link onClick={logout_ACTION} to='/' className='dropdown-item'>
          Logout
        </Link>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <button
        className={navbarClass}
        type='button'
        id='dropdown-guest'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        Login / register
      </button>
      <div className='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenuButton'>
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

const navbarClass = 'btn dropdown-toggle d-flex align-items-center user-dropdown p-0';

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
