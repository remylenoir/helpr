import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EventsPreview = ({ events }) => (
  <div>
    {events.map(event => (
      <Fragment key={event._id}>
        <h3>{event.title}</h3>
        <img src={event.imageURL} alt='event pic' />
        <p>{event.description}</p>
        <a href='#!'>More details</a>
      </Fragment>
    ))}
  </div>
);

EventsPreview.propTypes = {
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.profile.profile.createdEvents
});

export default connect(mapStateToProps)(EventsPreview);
