import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AlertPreview = ({ alerts: { alerts, loading } }) => {
  const alertElements =
    alerts &&
    alerts.map(alert => {
      return (
        <div key={alert._id}>
          <Row>
            <div className='col'>
              <h3>{alert.title}</h3>
            </div>
            <div className='col'>Type & creator</div>
          </Row>

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
