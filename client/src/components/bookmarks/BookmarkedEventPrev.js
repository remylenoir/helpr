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

const BookmarkedEventPrev = ({ profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile.favEvents.length > 0 ? (
        <Fragment>
          {profile.favEvents.map(event => (
            <Card key={event._id} className='mt-1 mb-4 text-left'>
              <Link to={`/event/${event._id}`}>
                <Card.Img variant='top' src={event.coverImage} />
                <Container className='py-2'>
                  <span className='card-date text-uppercase'>
                    {moment(event.date).format('MMMM Do, h:mm a')}
                  </span>
                  <Card.Subtitle className='mb-2 text-muted'>{event.categories}</Card.Subtitle>
                  <Card.Title className='mt-2'>{event.title}</Card.Title>
                </Container>
              </Link>
            </Card>
          ))}
        </Fragment>
      ) : (
        <p>You have no bookmarked events</p>
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
