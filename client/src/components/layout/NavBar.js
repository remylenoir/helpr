import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_ACTION } from '../../actions/auth';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = ({ auth: { isAuthenticated, loading }, logout_ACTION }) => {
  const authLinks = (
    <Fragment>
      <Link to='/dashboard'>Dashboard</Link>
      <Link onClick={logout_ACTION} to='/dashboard'>
        Logout
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
      <Link to='/'>Home</Link>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>{isAuthenticated ? authLinks : guestLinks}</Nav>
      </Navbar.Collapse>
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
