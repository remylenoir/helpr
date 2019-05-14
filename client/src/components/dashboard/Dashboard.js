import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile_ACTION } from '../../actions/profile';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import Spinner from '../layout/Spinner';
import PreviewCard from './PreviewCard';

// Bootstrap components
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Dashboard = ({
  getCurrentProfile_ACTION,
  getAllAlerts_ACTION,
  id,
  profile: { profile, loading },
  alerts
}) => {
  useEffect(() => {
    getCurrentProfile_ACTION(id);
    getAllAlerts_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && profile === null && alerts === null ? (
    <Spinner />
  ) : (
    <Container className='py-3' fluid>
      <Link to='/profile'>Profile</Link>
      <Row>
        <Container>
          <h1>Welcome {profile && profile.username}</h1>
          <hr />
        </Container>
      </Row>

      <Row>
        <Container fluid>
          <h2>Created Alerts</h2>
          <hr />
          <Row>
            <div className='horizontal-scroll'>
              <div className='horizontal-scroll-wrapper'>
                <Fragment>
                  {profile && profile.createdAlerts.length > 0 ? (
                    <PreviewCard type='createdAlerts' />
                  ) : (
                    noContentMsg('alerts')
                  )}
                </Fragment>
              </div>
            </div>
          </Row>
        </Container>
      </Row>

      {profile && profile.favAlerts.length > 0 && (
        <Row className='my-2'>
          <Container fluid>
            <h2>Bookmarked Alerts</h2>
            <hr />

            <Row>
              <div className='horizontal-scroll'>
                <div className='horizontal-scroll-wrapper'>
                  <Fragment>
                    <PreviewCard type='favAlerts' />
                  </Fragment>
                </div>
              </div>
            </Row>
          </Container>
        </Row>
      )}

      <Row className='my-2'>
        <Container fluid>
          <h2>Created Events</h2>
          <hr />

          <Row>
            <div className='horizontal-scroll'>
              <div className='horizontal-scroll-wrapper'>
                <Fragment>
                  {profile && profile.createdEvents.length > 0 ? (
                    <PreviewCard type='createdEvents' />
                  ) : (
                    noContentMsg('events')
                  )}
                </Fragment>
              </div>
            </div>
          </Row>
        </Container>
      </Row>

      {profile && profile.joinedEvents.length > 0 && (
        <Row className='my-2'>
          <Container fluid>
            <h2>Joined Events</h2>
            <hr />
            <Row>
              <div className='horizontal-scroll'>
                <div className='horizontal-scroll-wrapper'>
                  <Fragment>
                    <PreviewCard type='joinedEvents' />
                  </Fragment>
                </div>
              </div>
            </Row>
          </Container>
        </Row>
      )}

      {profile && profile.favEvents.length > 0 && (
        <Row className='my-2'>
          <Container fluid>
            <h2>Bookmarked Events</h2>
            <hr />

            <Row>
              <div className='horizontal-scroll'>
                <div className='horizontal-scroll-wrapper'>
                  <Fragment>
                    <PreviewCard type='favEvents' />
                  </Fragment>
                </div>
              </div>
            </Row>
          </Container>
        </Row>
      )}
    </Container>
  );
};

const noContentMsg = type => {
  const singularType = type.substring(0, type.length - 1);

  if (type === 'alerts') {
    return (
      <div>
        <h4>You have no created {type}</h4>
        <p>
          Do you want to see all the {type}? <Link to='/alert/all'>Click here</Link>
        </p>
        <p>
          Do you want to create an {singularType}? <a href='#!'>Click here</a>
        </p>
      </div>
    );
  }

  if (type === 'events') {
    return (
      <div>
        <h4>You have no created {type}</h4>
        <p>
          Do you want to see all the {type}? <Link to='/event/all'>Click here</Link>
        </p>
        <p>
          Do you want to create an {singularType}? <a href='#!'>Click here</a>
        </p>
      </div>
    );
  }
};

Dashboard.propTypes = {
  getCurrentProfile_ACTION: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.user._id,
  profile: state.profile,
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { getCurrentProfile_ACTION, getAllAlerts_ACTION }
)(Dashboard);
