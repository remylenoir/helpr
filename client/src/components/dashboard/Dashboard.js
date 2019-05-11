import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile_ACTION } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import AlertsPreview from './AlertsPreview';
import EventsPreview from './EventsPreview';

const Dashboard = ({
  getCurrentProfile_ACTION,
  id,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile_ACTION(id);
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {profile && profile.username}</h2>
      {profile.createdAlerts.length > 0 ? (
        <AlertsPreview />
      ) : (
        <div>
          <h2>You have no created alerts</h2>
          <p>
            Do you want to see all the alerts? <a href='#!'>Click here</a>
          </p>
          <p>
            Do you want create an alert? <a href='#!'>Click here</a>
          </p>
        </div>
      )}

      {profile.createdEvents.length > 0 ? (
        <EventsPreview />
      ) : (
        <div>
          <h2>You have no created events</h2>
          <p>
            Do you want to see all the events? <a href='#!'>Click here</a>
          </p>
          <p>
            Do you want create an event? <a href='#!'>Click here</a>
          </p>
        </div>
      )}
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
