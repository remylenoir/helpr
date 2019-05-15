import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Redux actions
import { getAlert_ACTION } from '../../actions/alerts';

// App components
import Spinner from '../layout/Spinner';
import FollowAlerBtn from './FollowAlertBtn';
import Hero from '../onboarding/Hero';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AlertDetails = ({
  match: {
    params: { alertId }
  },
  alerts: { alert, location, loading },
  auth,
  getAlert_ACTION
}) => {
  useEffect(() => {
    getAlert_ACTION(alertId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If alert info is still being fetched display spinner
  return loading && alert === null ? (
    <Spinner />
  ) : (
    <Container className='pb-3 inner-view' fluid>
      <Row>
        <Hero
          details={'details'}
          title={alert && alert.title}
          type={'alert'}
          msg={alert && alert.type}
          date={alert && alert.created_at}
          creator={alert && alert.creator}
          button={false}
          btnMsg={'Get involve now!'}
          url={alert && alert.imageURL}
        />
      </Row>
      <Row>
        <Container className='position-relative py-3'>
          <FollowAlerBtn />
          <h2>Description:</h2>
          <hr />
          <p>{alert && alert.description}</p>
          <h2>Location:</h2>
          <hr />
          <p>
            <span className='text-danger'>Insert map</span>
            <br />
            {alert && alert.location.coordinates[0]}, {alert && alert.location.coordinates[1]}
          </p>
          <hr />
          <div className='text-center'>
            {alert && auth.isAuthenticated && auth.user._id === alert.creator._id && (
              <Link to={`/alert/${alert._id}/edit`} className='btn btn-secondary'>
                Edit alert
              </Link>
            )}{' '}
            {alert && auth.isAuthenticated && (
              <Link to={`/dashboard`} className='btn btn-secondary'>
                Back to the dashboard
              </Link>
            )}
          </div>
          <br />
          <div className='text-center'>
            <Link to='/alert/all' className='btn btn-info'>
              See all alerts
            </Link>
          </div>
        </Container>
      </Row>
    </Container>
  );
};

AlertDetails.propTypes = {
  alerts: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAlert_ACTION }
)(AlertDetails);
