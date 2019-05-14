import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlert_ACTION } from '../../actions/alerts';
import Spinner from '../layout/Spinner';
import FollowAlerBtn from './FollowAlertBtn';

import Hero from '../onboarding/Hero';

// Bootstrap components
// import Button from 'react-bootstrap/Button';
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
    <Container className='pb-3' fluid>
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
          url={'https://source.unsplash.com/random'}
        />
      </Row>
      <Row>
        <Container className='position-relative py-3'>
          {auth.isAuthenticated && <FollowAlerBtn />}
          <h2>Description:</h2>
          <hr />
          <p>{alert && alert.description}</p>
          <h2>Location:</h2>
          <hr />
          <p>
            <span className='text-danger'>Insert map</span>
            <br />
            {location && location[0]}, {location && location[1]}
          </p>
          <hr />
          <div className='text-center'>
            {alert &&
              auth.isAuthenticated &&
              auth.user._id === alert.creator._id && (
                <Link
                  to={`/alert/${alert._id}/edit`}
                  className='btn btn-secondary'
                >
                  Edit alert
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
