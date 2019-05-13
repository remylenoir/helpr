import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvents_ACTION } from '../../actions/events';
import EventPreview from './EventPreview'

const EventList = ({ getAllEvents_ACTION, events: {events, loading} }) => {
  useEffect(() => {
    getAllEvents_ACTION();
  }, []);
  return (
    <div>
      <h1>All events</h1>
    <Fragment>
      <EventPreview />
    </Fragment>
    </div>
  );
};

EventList.propTypes = {};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getAllEvents_ACTION }
)(EventList);
