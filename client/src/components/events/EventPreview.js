import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const EventPreview = ({ events: { events, loading } }) => {
  const eventElements =
    events &&
    events.map(event => {
      return (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.fullDesc}</p>
          <img src={event.coverImage} alt='' />
          <Link to={`/event/${event._id}`}>More details</Link>
        </div>
      );
    });

  return loading && events === null ? <Spinner /> : <div>{eventElements}</div>;
};

EventPreview.propTypes = {
  events: PropTypes.object
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventPreview);
