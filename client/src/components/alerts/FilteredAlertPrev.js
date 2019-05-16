import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const FilteredAlertPrev = ({ alerts: { alerts, loading }, typeFilter }) => {
  const alertElements =
    alerts &&
    alerts.reverse().filter(alert => alert.type === typeFilter).map(alert => {
      return (
        <Card key={alert._id} className='mt-1 mb-4 text-left'>
          <Link to={`/alert/${alert._id}`}>
            <Container className='py-2'>
              <span className='card-date text-uppercase'>{moment(alert.created_at).fromNow()}</span>
              <Card.Subtitle className='text-muted'>{alert.type}</Card.Subtitle>
              <Card.Title className='mt-2'>{alert.title}</Card.Title>
            </Container>
          </Link>
        </Card>
      );
    });

  return loading && alerts === null ? <Spinner /> : <Fragment>{alertElements.length > 0 ? alertElements : <p>There are no active alerts of <b>{typeFilter}</b> type</p>}</Fragment>;
};

FilteredAlertPrev.propTypes = {
  alerts: PropTypes.object
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(FilteredAlertPrev);
