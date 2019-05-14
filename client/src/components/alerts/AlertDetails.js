import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlert_ACTION } from '../../actions/alerts';
import { checkBookmark_ACTION } from '../../actions/profile'
import Spinner from '../layout/Spinner';
import FollowAlerBtn from './FollowAlertBtn'

const AlertDetails = ({
  match: {
    params: { alertId }
  },
  alerts: { alert, location, loading },
  auth,
  getAlert_ACTION,
  checkBookmark_ACTION
}) => {
  useEffect(() => {
    // Get alert info by ID when component mounts
    getAlert_ACTION(alertId);
    auth.isAuthenticated && checkBookmark_ACTION(alertId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If alert info is still being fetched display spinner
  return loading && alert === null ? (
    <Spinner />
  ) : (
    <div>
      <h2>{alert && alert.title}</h2>
      <p>Date of creation: {alert && alert.created_at}</p>
      <p>Type of alert: {alert && alert.type}</p>
      <p>Description: {alert && alert.description}</p>
      <p>
        Location: {location && location[0]}, {location && location[1]}
      </p>
      <p>
        Images: <img src={alert && alert.imageURL} alt='alert pic' />
      </p>
      <br />
      {alert && auth.isAuthenticated && auth.user._id === alert.creator._id ? (
        <Link to={`/alert/${alert._id}/edit`}>Edit alert</Link>
      ) : (
        auth.isAuthenticated && <FollowAlerBtn />
      )}
      <br />
      <Link to='/alert/all'>See all alerts</Link>
    </div>
  );
};

AlertDetails.propTypes = {
  alerts: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAlert_ACTION, checkBookmark_ACTION }
)(AlertDetails);
