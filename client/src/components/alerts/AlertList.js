import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import AlertPreview from './AlertPreview';

const AlertList = ({ getAllAlerts_ACTION }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

AlertList.propTypes = {
  getAllAlerts_ACTION: PropTypes.func.isRequired
};

export default connect(
  null,
  { getAllAlerts_ACTION }
)(AlertList);
