import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertsPreview = ({ alerts }) => (
  <div>
    {alerts.map(alert => (
      <Fragment key={alert._id}>
        <h3>{alert.title}</h3>
        <img src={alert.imageURL} alt='alert pic' />
        <p>{alert.description}</p>
        <a href='#!'>More details</a>
      </Fragment>
    ))}
  </div>
);

AlertsPreview.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.profile.profile.createdAlerts
});

export default connect(mapStateToProps)(AlertsPreview);
