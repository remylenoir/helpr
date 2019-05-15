import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//import bootstrap
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//icon fonts
import OurFontAwesome from '../layout/OurFontAwesome';

const Profile = ({
  user: {
    username,
    firstName,
    lastName,
    profilePicture,
    createdEvents,
    joinedEvents,
    createdAlerts
  },
  loading,
  user
}) => {
  // Set the state to handle edit form toggle
  console.log(user);
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <div id='profile'>
              <Link to='/dashboard'>
                <OurFontAwesome icon={'fa-arrow-left'} /> Back to Dashboard
              </Link>
              <div className='image-edit'>
                <div className='profile-img-holder'>
                  <Image className='profile-img' src={profilePicture} />
                </div>
              </div>
              <div className='user-info'>
                <h4>{username}</h4>
                {firstName && (
                  <span>
                    {firstName} {lastName}
                  </span>
                )}
              </div>
              <div className='user-stats'>
                <ul>
                  <li>
                    <span>{joinedEvents.length}</span>
                    <label>Attending events</label>
                  </li>
                  <li>
                    <span>{createdAlerts.length}</span>
                    <label>Alerts created</label>
                  </li>
                  <li>
                    <span>{createdEvents.length}</span>
                    <label>Events created</label>
                  </li>
                </ul>
              </div>
              <div className='text-right'>
                <Link to='/profile/edit'>Edit profile</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>

    //   <Link to='/profile/edit'>Edit profile</Link>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.profile.profile,
  loading: state.profile
});

export default connect(mapStateToProps)(Profile);
