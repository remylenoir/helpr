/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { getAllEvents_ACTION } from '../../actions/events';
import { getAllAlerts_ACTION } from '../../actions/alerts';

// App components
import BackLink from '../layout/BackLink';

const Search = ({ events, alerts, history, getAllEvents_ACTION, getAllAlerts_ACTION }) => {
  useEffect(() => {
    getAllEvents_ACTION();
    getAllAlerts_ACTION();
    window.scroll(0, 0)
  }, []);

  const allEventsArr =
    events &&
    events.map(event => {
      return {
        title: event.title,
        id: event._id
      };
    });

  const allAlertsArr =
    alerts &&
    alerts.map(alert => {
      return {
        title: alert.title,
        id: alert._id
      };
    });

  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [alertSuggestions, setAlertSuggestions] = useState([]);

  const onTextChangedEvents = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = events && allEventsArr.filter(event => regex.test(event.title));

      setEventSuggestions(suggestions);
    } else if (value.length === 0) {
      setEventSuggestions(suggestions);
    }
  };

  const renderSuggestionsEvents = () => {
    if (events && eventSuggestions.length === 0) {
      return null;
    }
    return (
      <Fragment>
        {events &&
          eventSuggestions.map(event => {
            return (
              <div key={event.id}>
                <Link to={`/event/${event.id}`}>{event.title}</Link>
              </div>
            );
          })}
      </Fragment>
    );
  };

  const onTextChangedAlerts = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = alerts && allAlertsArr.filter(alert => regex.test(alert.title));

      setAlertSuggestions(suggestions);
    } else if (value.length === 0) {
      setAlertSuggestions(suggestions);
    }
  };

  const renderSuggestionsAlerts = () => {
    if (alerts && alertSuggestions.length === 0) {
      return null;
    }
    return (
      <Fragment>
        {alerts &&
          alertSuggestions.map(alert => {
            return (
              <div key={alert.id}>
                <Link to={`/alert/${alert.id}`}>{alert.title}</Link>
              </div>
            );
          })}
      </Fragment>
    );
  };

  const eventOnSubmit = e => {
    e.preventDefault();
    if (events && eventSuggestions.length === 1) {
      history.push(`/event/${eventSuggestions[0].id}`);
    }
  };

  const alertOnSubmit = e => {
    e.preventDefault();
    if (alerts && alertSuggestions.length === 1) {
      history.push(`/alert/${alertSuggestions[0].id}`);
    }
  };

  return (
    <div>
      <BackLink url={`/explore`} title={'Explore'} />
      <div>
        <form onSubmit={eventOnSubmit}>
          <input onChange={onTextChangedEvents} type='text' placeholder='Search events' />
          {renderSuggestionsEvents()}
        </form>
      </div>
      <div>
        <form onSubmit={alertOnSubmit}>
          <input onChange={onTextChangedAlerts} type='text' placeholder='Search alerts' />
          {renderSuggestionsAlerts()}
        </form>
      </div>
    </div>
  );
};

Search.propTypes = {
  history: PropTypes.object,
  events: PropTypes.array,
  alerts: PropTypes.array,
  getAllAlerts_ACTION: PropTypes.func.isRequired,
  getAllEvents_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events.events,
  alerts: state.alerts.alerts
});

export default connect(
  mapStateToProps,
  { getAllEvents_ACTION, getAllAlerts_ACTION }
)(Search);
