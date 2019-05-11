import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile_ACTION } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PreviewCard from './PreviewCard';

const Dashboard = ({
  getCurrentProfile_ACTION,
  id,
  profile: { profile, loading }
}) => {
  const [displayContent, toggleContent] = useState({
    createdAlertsDisplay: true,
    createdEventsDisplay: true,
    favAlertsDisplay: true,
    favEventsDisplay: true,
    joinedEventsDisplay: true
  });

  const {
    createdAlertsDisplay,
    createdEventsDisplay,
    favAlertsDisplay,
    favEventsDisplay,
    joinedEventsDisplay
  } = displayContent;

  useEffect(() => {
    getCurrentProfile_ACTION(id);
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {profile && profile.username}</h2>

      <div style={{ border: '1px solid black', margin: '10px' }}>
        <h3>Created Alerts</h3>
        <button
          onClick={() =>
            toggleContent({
              ...displayContent,
              createdAlertsDisplay: !createdAlertsDisplay
            })
          }
        >
          {createdAlertsDisplay ? <span>Hide</span> : <span>Show</span>}
        </button>
        {createdAlertsDisplay && (
          <Fragment>
            {profile.createdAlerts.length > 0 ? (
              <PreviewCard type='createdAlerts' />
            ) : (
              noContentMsg('alerts')
            )}
          </Fragment>
        )}
      </div>

      {profile.favAlerts.length > 0 && (
        <div style={{ border: '1px solid black', margin: '10px' }}>
          <h3>Bookmarked Alerts</h3>
          <button
            onClick={() =>
              toggleContent({
                ...displayContent,
                favAlertsDisplay: !favAlertsDisplay
              })
            }
          >
            {favAlertsDisplay ? <span>Hide</span> : <span>Show</span>}
          </button>
          {favAlertsDisplay && (
            <Fragment>
              <PreviewCard type='favAlerts' />
            </Fragment>
          )}
        </div>
      )}

      <div style={{ border: '1px solid black', margin: '10px' }}>
        <h3>Created Events</h3>
        <button
          onClick={() =>
            toggleContent({
              ...displayContent,
              createdEventsDisplay: !createdEventsDisplay
            })
          }
        >
          {createdEventsDisplay ? <span>Hide</span> : <span>Show</span>}
        </button>
        {createdEventsDisplay && (
          <Fragment>
            {profile.createdEvents.length > 0 ? (
              <PreviewCard type='createdEvents' />
            ) : (
              noContentMsg('events')
            )}
          </Fragment>
        )}
      </div>

      {profile.joinedEvents.length > 0 && (
        <div style={{ border: '1px solid black', margin: '10px' }}>
          <h3>Joined Events</h3>
          <button
            onClick={() =>
              toggleContent({
                ...displayContent,
                joinedEventsDisplay: !joinedEventsDisplay
              })
            }
          >
            {joinedEventsDisplay ? <span>Hide</span> : <span>Show</span>}
          </button>
          {joinedEventsDisplay && (
            <Fragment>
              <PreviewCard type='joinedEvents' />
            </Fragment>
          )}
        </div>
      )}

      {profile.favEvents.length > 0 && (
        <div style={{ border: '1px solid black', margin: '10px' }}>
          <h3>Bookmarked Events</h3>
          <button
            onClick={() =>
              toggleContent({
                ...displayContent,
                favEventsDisplay: !favEventsDisplay
              })
            }
          >
            {favEventsDisplay ? <span>Hide</span> : <span>Show</span>}
          </button>
          {favEventsDisplay && (
            <Fragment>
              <PreviewCard type='favEvents' />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

const noContentMsg = type => {
  const singularType = type.substring(0, type.length - 1);

  return (
    <div>
      <h4>You have no created {type}</h4>
      <p>
        Do you want to see all the {type}? <a href='#!'>Click here</a>
      </p>
      <p>
        Do you want to create an {singularType}? <a href='#!'>Click here</a>
      </p>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile_ACTION: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.user._id,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile_ACTION }
)(Dashboard);
