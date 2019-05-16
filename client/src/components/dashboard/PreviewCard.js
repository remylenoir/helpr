import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const PreviewCard = ({
  type,
  profile: { createdAlerts, createdEvents, favAlerts, favEvents, joinedEvents }
}) => {
  return type === 'createdAlerts' ? (
    <Fragment>
      {/* ----- ALERTS ----- */}
      {createdAlerts.reverse().map(alert => (
        <Card key={alert._id} className='mt-1 mb-4 text-left'>
          <Link to={`/alert/${alert._id}`}>
            <Container className='py-2'>
              <span className='card-date text-uppercase'>{moment(alert.created_at).fromNow()}</span>
              <Card.Subtitle className='text-muted'>{alert.type}</Card.Subtitle>
              <Card.Title className='mt-2'>{alert.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : type === 'favAlerts' ? (
    <Fragment>
      {favAlerts.reverse().map(alert => (
        <Card key={alert._id} className='mt-1 mb-4 text-left'>
          <Link to={`/alert/${alert._id}`}>
            <Container className='py-2'>
              <span className='card-date text-uppercase'>{moment(alert.created_at).fromNow()}</span>
              <Card.Subtitle className='text-muted'>{alert.type}</Card.Subtitle>
              <Card.Title className='mt-2'>{alert.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : type === 'createdEvents' ? (
    <Fragment>
      {/* ----- EVENTS ----- */}
      {createdEvents.reverse().map(event => (
        <Card key={event._id} className='mt-1 mb-4 text-left'>
          <Link to={`/event/${event._id}`}>
            <Card.Img variant='top' src={event.coverImage} />
            <Container className='py-2'>
              <span className='card-date text-uppercase'>
                {moment(event.date).format('MMMM Do, h:mm a')}
              </span>
              <Card.Subtitle className='mb-2 text-muted'>{event.categories}</Card.Subtitle>
              <Card.Title className='mt-2'>{event.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : type === 'joinedEvents' ? (
    <Fragment>
      {joinedEvents.reverse().map(event => (
        <Card key={event._id} className='mt-1 mb-4 text-left'>
          <Link to={`/event/${event._id}`}>
            <Card.Img variant='top' src={event.coverImage} />
            <Container className='py-2'>
              <span className='card-date text-uppercase'>
                {moment(event.date).format('MMMM Do, h:mm a')}
              </span>
              <Card.Subtitle className='mb-2 text-muted'>{event.categories}</Card.Subtitle>
              <Card.Title className='mt-2'>{event.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : type === 'favEvents' ? (
    <Fragment>
      {favEvents.reverse().map(event => (
        <Card key={event._id} className='mt-1 mb-4 text-left'>
          <Link to={`/event/${event._id}`}>
            <Card.Img variant='top' src={event.coverImage} />
            <Container className='py-2'>
              <span className='card-date text-uppercase'>
                {moment(event.date).format('MMMM Do, h:mm a')}
              </span>
              <Card.Subtitle className='mb-2 text-muted'>{event.categories}</Card.Subtitle>
              <Card.Title className='mt-2'>{event.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : null;
};

PreviewCard.propTypes = {
  type: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(mapStateToProps)(PreviewCard);
