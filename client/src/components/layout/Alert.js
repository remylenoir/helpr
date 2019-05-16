import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Bootstrap components
import AlertMessage from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Row key={alert.id}>
      <AlertMessage variant={alert.type} className=' my-3 mx-auto position-fixed'>
        {alert.msg}
      </AlertMessage>
    </Row>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
