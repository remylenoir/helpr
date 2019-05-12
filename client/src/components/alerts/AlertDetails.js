import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlert_ACTION } from '../../actions/alerts';
import Spinner from '../layout/Spinner';

const AlertDetails = ({
  match: {
    params: { alertId: alertId }
  },
  alert,
  location,
  loading,
  auth,
  getAlert_ACTION
}) => {
  useEffect(() => {
    getAlert_ACTION(alertId);
  }, []);

  const creatorButtons = (
    <Fragment>
      <a href='#!'>Edit alert</a> <a href='#!'>Delete alert</a>
    </Fragment>
  );

  return loading && alert === null ? (
    <Spinner />
  ) : (
    <div>
      <h2>{alert && alert.title}</h2>
      <p>Type of alert: {alert && alert.type}</p>
      <p>Description: {alert && alert.description}</p>
      <p>
        Location: {location && location[0]}, {location && location[1]}
      </p>
      <p>
        Images: <img src={alert && alert.imageURL} alt='alert pic' />
      </p>
      {auth.isAuthenticated &&
        auth.user._id === alert.creator._id &&
        creatorButtons}
      <br />
      <a href='#!'>See all alerts</a>
    </div>
  );
};

AlertDetails.propTypes = {
  alert: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.string.isRequired,
  location: PropTypes.array.isRequired,
  getAlert_ACTION: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alerts.alert,
  loading: state.alerts.loading,
  location: state.alerts.location,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAlert_ACTION }
)(AlertDetails);
