import React, { useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import { getAllEvents_ACTION } from '../../actions/events';
import AlertPreview from '../alerts/AlertPreview';
import EventPreview from '../events/EventPreview';
import Search from '../layout/Search';

const Explore = ({
  alerts,
  events,
  getAllAlerts_ACTION,
  getAllEvents_ACTION
}) => {
  useEffect(() => {
    getAllAlerts_ACTION();
    getAllEvents_ACTION();
  }, []);

  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <div>

          <Link to='/search'>Search</Link>
          <h2>Current Active Alerts</h2>
          <AlertPreview />
          <h2>Current Active Events</h2>
          <EventPreview />
    
    </div>
  );
};

Explore.propTypes = {};

const mapStateToProps = state => ({
  alerts: state.alerts,
  events: state.events
});

export default connect(
  mapStateToProps,
  { getAllAlerts_ACTION, getAllEvents_ACTION }
)(Explore);
