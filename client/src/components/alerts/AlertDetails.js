import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { getAlert_ACTION } from '../../actions/alerts';

// App components
import Map from './Map/AlertMap';
import Hero from '../layout/Hero';
import Spinner from '../layout/Spinner';
import FollowAlerBtn from './FollowAlertBtn';
import Subtitle from '../layout/Headings/Subtitle';
import AlertComments from '../alerts/AlertComments';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
          type={'details'}
          title={alert && alert.title}
          category={alert && alert.type}
          date={alert && alert.created_at}
          dateformat={'spent'}
          creator={alert && alert.creator}
          url={alert && alert.imageURL}
        />
      </Row>
      <Row>
        <Container className='position-relative py-3'>
          <div className='actions-buttons position-absolute'>
            <FollowAlerBtn />
          </div>

          <div className='mb-4'>
            <Subtitle title={'Description'} />
            <p>{alert && alert.description}</p>
          </div>

          <div className='mb-4'>
            <Subtitle title={'Where'} />
            <div className='alert-with-map'>
              <Row>
                {alert && (
                  <Map
                    navControl={true}
                    height={320}
                    width={window.innerWidth}
                    alert={alert && alert.location}
                  />
                )}
              </Row>
            </div>

            <div className='mb-4'>{alert && <AlertComments />}</div>
          </div>

          {alert && auth.isAuthenticated && auth.user._id === alert.creator._id && (
            <Card border='warning' className='my-3 no-shadow text-center'>
              <Card.Header>Administrator area</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Link to={`/alert/${alert._id}/edit`} className='btn btn-warning'>
                    Edit alert
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {/* <div className='text-center'>
            {alert && auth.isAuthenticated && (
              <Link to={`/dashboard`} className='btn btn-secondary'>
                Back to the dashboard
              </Link>
            )}
          </div>
          <br /> */}
          {/* <div className='text-center'>
            <Link to='/alert/all' className='btn btn-info'>
              See all alerts
            </Link>
          </div> */}
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
