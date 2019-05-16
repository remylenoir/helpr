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

const BookmarkedAlertPrev = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.favAlerts.length > 0 ? (
        <Fragment>
          {profile.favAlerts.map(alert => (
            <Card key={alert._id} className='mt-1 mb-2 text-left'>
              <Link to={`/alert/${alert._id}`}>
                <Container className='py-2'>
                  <span className='card-date text-uppercase'>{moment(alert.created_at).fromNow()}</span>
                  <Card.Subtitle className='text-muted'>{alert.type}</Card.Subtitle>
                  <Card.Title className='mt-2'>{alert.title}</Card.Title>
                </Container>
              </Link>
            </Card>
          ))}
        </Fragment>
      ) : (
        <p>You have no bookmarked alerts</p>
      )}
    </Fragment>
  );
};

BookmarkedAlertPrev.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(BookmarkedAlertPrev);
