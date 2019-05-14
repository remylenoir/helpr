import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Bootstrap components
import Card from 'react-bootstrap/Card';

const PreviewCard = ({
  type,
  profile: { createdAlerts, createdEvents, favAlerts, favEvents, joinedEvents }
}) => {
  return type === 'createdAlerts' ? (
    <Fragment>
      {createdAlerts.map(alert => (
        <Card key={alert._id} style={{ width: '15rem' }}>
          <Link to={`/alert/${alert._id}`}>
            {alert.imageURL && <Card.Img variant='top' src={alert.imageURL} />}
            <Card.Body>
              <Card.Title>{alert.title}</Card.Title>
              <Card.Text>{alert.description}</Card.Text>
              {/* <Link to={`/alert/${alert._id}`}>More details</Link> */}
            </Card.Body>
          </Link>
        </Card>
      ))}
    </Fragment>
  ) : type === 'createdEvents' ? (
    <Fragment>
      {createdEvents.map(event => (
        <Card key={event._id} style={{ width: '15rem' }}>
          <Card.Img variant='top' src={event.imageURL} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Link to={`/event/${event._id}`}>More details</Link>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  ) : type === 'favAlerts' ? (
    <Fragment>
      {favAlerts.map(alert => (
        <Card key={alert._id} style={{ width: '15rem' }}>
          <Card.Img variant='top' src={alert.imageURL} />
          <Card.Body>
            <Card.Title>{alert.title}</Card.Title>
            <Card.Text>{alert.description}</Card.Text>
            <Link to={`/alert/${alert._id}`}>More details</Link>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  ) : type === 'favEvents' ? (
    <Fragment>
      {favEvents.map(event => (
        <Card key={event._id} style={{ width: '15rem' }}>
          <Card.Img variant='top' src={event.imageURL} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Link to={`/event/${event._id}`}>More details</Link>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  ) : type === 'joinedEvents' ? (
    <Fragment>
      {joinedEvents.map(event => (
        <Card key={event._id} style={{ width: '15rem' }}>
          <Card.Img variant='top' src={event.imageURL} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Link to={`/event/${event._id}`}>More details</Link>
          </Card.Body>
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
