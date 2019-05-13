import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const AlertPreview = ({ alerts: { alerts, loading } }) => {
  const alertElements =
    alerts &&
    alerts.map(alert => {
      return (
        <div key={alert._id}>
          <h3>{alert.title}</h3>
          <p>{alert.description}</p>
          <img src={alert.imageURL} alt='' />
          <Link to={`/alert/${alert._id}`}>More details</Link>
        </div>
      );
    });

  return loading && alerts === null ? <Spinner /> : <div>{alertElements}</div>;
};

AlertPreview.propTypes = {
  alerts: PropTypes.object
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(AlertPreview);
