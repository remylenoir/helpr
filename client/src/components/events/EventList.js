import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEvents_ACTION } from '../../actions/events';
import EventPreview from './EventPreview';

const EventList = ({ getAllEvents_ACTION }) => {
  useEffect(() => {
    getAllEvents_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

EventList.propTypes = {
  getAllEvents_ACTION: PropTypes.func
};

export default connect(
  null,
  { getAllEvents_ACTION }
)(EventList);
