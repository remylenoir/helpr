import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

// Redux actions
import { getCurrentProfile_ACTION } from '../../actions/profile';
import { getAllEvents_ACTION } from '../../actions/events';

// App components
import Spinner from '../layout/Spinner';
import PreviewCard from './PreviewCard';
import Subtitle from '../layout/Headings/Subtitle';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Dashboard = ({
  getCurrentProfile_ACTION,
  getAllEvents_ACTION,
  id,
  profile: { profile, loading },
  alerts
}) => {
  useEffect(() => {
    getCurrentProfile_ACTION(id);
    getAllEvents_ACTION();
    window.scroll(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && profile === null && alerts === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container className='inner-view py-3' fluid>
        <Row>
          <Container>
            <FadeIn>
              <h1>Welcome {profile && profile.username}</h1>
              <hr />
            </FadeIn>
          </Container>
        </Row>

        {/* ----- ALERTS ----- */}
        {/* Created Alerts */}
        <Row>
          <Container fluid>
            <FadeIn>
              <Subtitle title={'Created Alerts'} />
              <Row>
                {profile && profile.createdAlerts.length > 0 ? (
                  <div className='horizontal-scroll'>
                    <div className='horizontal-scroll-wrapper'>
                      <PreviewCard type='createdAlerts' />
                    </div>
                  </div>
                ) : (
                  noContentMsg('alerts')
                )}
              </Row>
            </FadeIn>
          </Container>
        </Row>

        {/* Bookmarked Alerts */}
        {profile && profile.favAlerts.length > 0 && (
          <Row className='my-2'>
            <Container fluid>
              <FadeIn>
                <Subtitle title={'Bookmarked Alerts'} />
                <Row>
                  <div className='horizontal-scroll'>
                    <div className='horizontal-scroll-wrapper'>
                      <PreviewCard type='favAlerts' />
                    </div>
                  </div>
                </Row>
              </FadeIn>
            </Container>
          </Row>
        )}

        {/* ----- EVENTS ----- */}
        {/* Created Events */}
        <Row className='my-2'>
          <Container fluid>
            <FadeIn>
              <Subtitle title={'Created Events'} />
              <Row>
                {profile && profile.createdEvents.length > 0 ? (
                  <div className='horizontal-scroll'>
                    <div className='horizontal-scroll-wrapper'>
                      <PreviewCard type='createdEvents' />
                    </div>
                  </div>
                ) : (
                  noContentMsg('events')
                )}
              </Row>
            </FadeIn>
          </Container>
        </Row>

        {/* Joined Alerts */}
        {profile && profile.joinedEvents.length > 0 && (
          <Row className='my-2'>
            <Container fluid>
              <FadeIn>
                <Subtitle title={'Joined Events'} />
                <Row>
                  <div className='horizontal-scroll'>
                    <div className='horizontal-scroll-wrapper'>
                      <PreviewCard type='joinedEvents' />
                    </div>
                  </div>
                </Row>
              </FadeIn>
            </Container>
          </Row>
        )}

        {/* Bookmarked Events */}
        {profile && profile.favEvents.length > 0 && (
          <Row className='my-2'>
            <Container fluid>
              <FadeIn>
                <Subtitle title={'Bookmarked Events'} />
                <Row>
                  <div className='horizontal-scroll'>
                    <div className='horizontal-scroll-wrapper'>
                      <PreviewCard type='favEvents' />
                    </div>
                  </div>
                </Row>
              </FadeIn>
            </Container>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

const noContentMsg = type => {
  const singularType = type.substring(0, type.length - 1);

  if (type === 'alerts') {
    return (
      <Container>
        <FadeIn>
          <h4>You have no created {type}</h4>
          <p>
            Do you want to see all the {type}?{' '}
            <Link to='/alert/all'>Click here</Link>
          </p>
          <p>
            Do you want to create an {singularType}?{' '}
            <Link to='/create/alert'>Click here</Link>
          </p>
        </FadeIn>
      </Container>
    );
  }

  if (type === 'events') {
    return (
      <Container>
        <FadeIn>
          <h4>You have no created {type}</h4>
          <p>
            Do you want to see all the {type}?{' '}
            <Link to='/event/all'>Click here</Link>
          </p>
          <p>
            Do you want to create an {singularType}?{' '}
            <Link to='/create/event'>Click here</Link>
          </p>
        </FadeIn>
      </Container>
    );
  }
};

Dashboard.propTypes = {
  getCurrentProfile_ACTION: PropTypes.func.isRequired,
  getAllEvents_ACTION: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  alerts: PropTypes.object
};

const mapStateToProps = state => ({
  id: state.auth.user._id,
  profile: state.profile,
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { getCurrentProfile_ACTION, getAllEvents_ACTION }
)(Dashboard);
