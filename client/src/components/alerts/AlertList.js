import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import AlertPreview from './AlertPreview';

const AlertList = ({ getAllAlerts_ACTION, alerts: {alerts, loading} }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
  }, []);
  return (
    <div>
      <h1>All alerts</h1>
    <Fragment>
      <AlertPreview />
    </Fragment>
    </div>
  );
};

AlertList.propTypes = {};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { getAllAlerts_ACTION }
)(AlertList);
