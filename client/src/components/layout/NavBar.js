import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_ACTION } from '../../actions/auth';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout_ACTION }) => {
  const authLinks = (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle
          id='dropdown-user'
          variant='outline-dark'
          className='d-flex align-items-center user-dropdown'
        >
          <Container>
            <Row className='align-items-center'>
              <div className='col text-right user-name'>
                <Link to='/dashboard' className='text-dark'>
                  {user && user.username}
                </Link>
              </div>
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
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to='/dashboard'>Dashboard</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link onClick={logout_ACTION} to='/dashboard'>
              Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle id='dropdown-guest' variant='outline-dark' className='user-dropdown'>
          Login / register
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to='/login'>Login</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to='/register'>Register</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
      <Link to='/'>Helpr.</Link>
      {isAuthenticated ? authLinks : guestLinks}
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
