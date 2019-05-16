import React, { Fragment } from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import BackLink from '../layout/BackLink';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../layout/Spinner';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

const Profile = ({
  user: { username, firstName, lastName, profilePicture, createdEvents, joinedEvents, createdAlerts },
  loading,
  user
}) => {
  // Set the state to handle edit form toggle
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <FadeIn>
          <Row>
            <Col>
              <div id='profile'>
                <BackLink url={'/dashboard'} title={'Back to dashboard'} />

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
                <div className='text-center'>
                  <Link to='/profile/edit' className='btn btn-primary'>
                    Edit profile
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </FadeIn>
      </Container>
    </Fragment>
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
