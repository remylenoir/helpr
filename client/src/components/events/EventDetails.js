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
          url={event && event.imageURL}
        />
      </Row>
      <Row>
        <Container className='position-relative py-3'>
          <div className='actions-buttons position-absolute'>
            <FollowEventBtn /> <JoinEventBtn />
          </div>
          <h2>Description:</h2>
          <hr />
          <p>{event && event.fullDesc}</p>
          <h2>Location:</h2>
          <hr />
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
          <br />
          <div className='text-center'>
            <Link to='/event/all' className='btn btn-info'>
              See all events
            </Link>
          </div>
        </Container>
      </Row>
    </Container>

    // <div>
    //   <FollowEventBtn />
    //   <JoinEventBtn />
    //   <h2>{event && event.title}</h2>
    //   <p>Description: {event && event.fullDesc}</p>
    //   <p>Date: {date && date}</p>
    //   <p>
    //     Location: {location && location[0]}, {location && location[1]}
    //   </p>
    //   <p>
    //     Images: <img src={event && event.coverImage} alt='event pic' />
    //   </p>
    //   <br />
    //   <EventAttendees />
    //   <br />
    //   {event && auth.isAuthenticated && auth.user._id === event.creator ? (
    //     <Link to={`/event/${event._id}/edit`}>Edit event</Link>
    //   ) : (
    //     <Fragment />
    //   )}

    //   <br />
    //   <Link to='/event/all'>See all events</Link>
    // </div>
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
