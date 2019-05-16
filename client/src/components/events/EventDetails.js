import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { getEvent_ACTION } from '../../actions/events';

// App components
import Hero from '../layout/Hero';
import Spinner from '../layout/Spinner';
import JoinEventBtn from './JoinEventBtn';
import FollowEventBtn from './FollowEventBtn';
import EventAttendees from './EventAttendees';
import Subtitle from '../layout/Headings/Subtitle';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const EventDetails = ({
  match: {
    params: { eventId }
  },
  events: { event, date, location, loading },
  auth,
  getEvent_ACTION
}) => {
  useEffect(() => {
    getEvent_ACTION(eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If alert info is still being fetched display spinner
  return loading && event === null ? (
    <Spinner />
  ) : (
    <Container className='pb-3 inner-view' fluid>
      <Row>
        <Hero
          type={'details'}
          msg={event && event.type}
          title={event && event.title}
          date={event && event.created_at}
          creator={event && event.creator}
          url={event && event.coverImage}
        />
      </Row>
      <Row>
        <Container className='position-relative py-3'>
          <div className='actions-buttons position-absolute'>
            <FollowEventBtn /> <JoinEventBtn />
          </div>

          <Subtitle title={'Description'} />
          <p>{event && event.fullDesc}</p>

          <Subtitle title={'Location'} />
          <p>
            <span className='text-danger'>Insert map</span>
          </p>

          <hr />

          <EventAttendees />

          {event && auth.isAuthenticated && auth.user._id === event.creator._id && (
            <Card border='warning' className='my-3 no-shadow text-center'>
              <Card.Header>Administrator area</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Link to={`/event/${event._id}/edit`} className='btn btn-warning'>
                    Edit event
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {event && auth.isAuthenticated && (
            <div className='text-center'>
              <Link to={`/dashboard`} className='btn btn-secondary'>
                Back to the dashboard
              </Link>
            </div>
          )}
          {/* <br />
          <div className='text-center'>
            <Link to='/event/all' className='btn btn-info'>
              See all events
            </Link>
          </div> */}
        </Container>
      </Row>
    </Container>
  );
};

EventDetails.propTypes = {
  events: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getEvent_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvent_ACTION }
)(EventDetails);
