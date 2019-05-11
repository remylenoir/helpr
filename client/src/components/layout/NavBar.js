import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_ACTION } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout_ACTION }) => {
  const authLinks = (
    <nav>
      <h2>
        <Link to='/dashboard'>Dashboard</Link>
        <br/>
        <a onClick={logout_ACTION} href='#!'>
          Logout
        </a>
      </h2>
    </nav>
  );

  const guestLinks = (
    <nav>
      <h2>
        <Link to='/register'>Register</Link>
        <br />
        <Link to='/login'>Login</Link>
      </h2>
    </nav>
  );

  return (
    <nav>
      <h2>
        <Link to='/'>Home</Link>
      </h2>
      {/* add !loading &&  */}
      {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
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
