import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Card from 'react-bootstrap/Card';

const BookmarkedEventPrev = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.favEvents.length > 0 ? (
        <Fragment>
          {profile.favEvents.map(event => (
            <Card key={event._id} style={{ width: '15rem' }}>
              <Link to={`/event/${event._id}`}>
                {event.coverImage && (
                  <Card.Img variant='top' src={event.coverImage} />
                )}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.shortDesc}</Card.Text>
                  {/* <Link to={`/event/${event._id}`}>More details</Link> */}
                </Card.Body>
              </Link>
            </Card>
          ))}
        </Fragment>
      ) : (
        <h3>You have no bookmarked events</h3>
      )}
    </Fragment>
  );
};

BookmarkedEventPrev.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(BookmarkedEventPrev);
