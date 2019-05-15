import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Card from 'react-bootstrap/Card';

const BookmarkedAlertPrev = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.favAlerts.length > 0 ? (
        <Fragment>
          {profile.favAlerts.map(alert => (
            <Card key={alert._id} style={{ width: '15rem' }}>
              <Link to={`/alert/${alert._id}`}>
                {alert.imageURL && (
                  <Card.Img variant='top' src={alert.imageURL} />
                )}
                <Card.Body>
                  <Card.Title>{alert.title}</Card.Title>
                  <Card.Text>{alert.description}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))}
        </Fragment>
      ) : (
        <h3>You have no bookmarked alerts</h3>
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
