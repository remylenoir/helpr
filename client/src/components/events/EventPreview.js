import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Card from 'react-bootstrap/Card';

const EventPreview = ({ events: { events, loading } }) => {
  const eventElements =
    events &&
    events.map(event => {
      return (
        <Card key={event._id} className='mt-1 mb-4'>
          <Link to={`/event/${event._id}`}>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {event.creator.username} - {moment(event.created_at).fromNow()}
              </Card.Subtitle>
              <Card.Text>{event.shortDesc}</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      );
    });

  return loading && events === null ? <Spinner /> : <Fragment>{eventElements}</Fragment>;
};

EventPreview.propTypes = {
  events: PropTypes.object
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventPreview);
