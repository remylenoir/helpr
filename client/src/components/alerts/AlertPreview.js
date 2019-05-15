import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Card from 'react-bootstrap/Card';

const AlertPreview = ({ alerts: { alerts, loading } }) => {
  const alertElements =
    alerts &&
    alerts.map(alert => {
      return (
        <Fragment>
          <Card className='mt-1 mb-4'>
            <Link to={`/alert/${alert._id}`}>
              <Card.Body>
                <Card.Title>{alert.title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {alert.type} - {moment(alert.created_at).fromNow()}
                </Card.Subtitle>
                <Card.Text>{alert.description}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Fragment>
      );
    });

  return loading && alerts === null ? <Spinner /> : <>{alertElements}</>;
};

AlertPreview.propTypes = {
  alerts: PropTypes.object
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(AlertPreview);
