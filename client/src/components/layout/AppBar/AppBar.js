import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OurFontAwesome from '../OurFontAwesome';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AppMenu = ({ auth: { isAuthenticated, loading, user } }) => {
  // const authLinks = (
  //   <Fragment>
  //     <button
  //       className='btn btn-outline-dark dropdown-toggle d-flex align-items-center user-dropdown'
  //       type='button'
  //       id='dropdown-user'
  //       data-toggle='dropdown'
  //       aria-haspopup='true'
  //       aria-expanded='false'
  //     >
  //       <Container>
  //         <Row className='align-items-center'>
  //           <div className='col text-right user-name'>{user && user.username}</div>
  //           <div className='pr-2'>
  //             <Image
  //               src='https://source.unsplash.com/random'
  //               width='35'
  //               height='35'
  //               className='border'
  //               roundedCircle
  //             />
  //           </div>
  //         </Row>
  //       </Container>
  //     </button>
  //     <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
  //       <Link to='/dashboard' className='dropdown-item'>
  //         Dashboard
  //       </Link>
  //       <Link to='/profile' className='dropdown-item'>
  //         Settings
  //       </Link>
  //       <div className='dropdown-divider' />
  //     </div>
  //   </Fragment>
  // );

  // const guestLinks = (
  //   <Fragment>
  //     <button
  //       className='btn btn-outline-dark dropdown-toggle user-dropdown'
  //       type='button'
  //       id='dropdown-guest'
  //       data-toggle='dropdown'
  //       aria-haspopup='true'
  //       aria-expanded='false'
  //     >
  //       Login / register
  //     </button>
  //     <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
  //       <Link to='/login' className='dropdown-item'>
  //         Login
  //       </Link>
  //       <div className='dropdown-divider' />
  //       <Link to='/register' className='dropdown-item'>
  //         Register
  //       </Link>
  //     </div>
  //   </Fragment>
  // );

  return (
    <Navbar collapseOnSelect fixed='bottom' expand='true' bg='dark'>
      {/* {isAuthenticated ? authLinks : guestLinks} */}
      <div className='icon'>A</div>
      <div className='icon'>B</div>
      <div className='icon'>C</div>
      <div className='icon'>D</div>
      <div className='icon'>E</div>
    </Navbar>
  );
};

AppMenu.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AppMenu);
