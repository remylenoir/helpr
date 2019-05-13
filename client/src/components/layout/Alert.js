import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlertMessage from 'react-bootstrap/Alert';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <AlertMessage key={alert.id} variant='danger' className=' w-100 my-3'>
      {alert.msg}
    </AlertMessage>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
