import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { editEvent_ACTION } from '../../actions/events';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

const CommentCard = ({ event, user, editEvent_ACTION }) => {
  const eventData = {
    date: event && event.date,
    title: event && event.title,
    fullDesc: event && event.fullDesc,
    shortDesc: event && event.shortDesc,
    categories: event && event.categories,
    street: event && event.street,
    city: event && event.city,
    zipcode: event && event.zipcode,
    coverImage: event && event.coverImage,
    comments: event && event.comments
  };

  const deleteHandler = e => {
    const { value } = e.target;
    e.preventDefault();
    const filteredComments = event && event.comments.filter(commentEl => commentEl._id !== value);
    eventData.comments = filteredComments;
    editEvent_ACTION(event._id, eventData);
  };

  const commentElement =
    event &&
    event.comments.map(comment => {
      return (
        <Card key={comment._id}>
          <Card.Header>
            <Image variant='top' src={comment.author.profilePicture} className='attendee-profile' />{' '}
            {comment.author.firstName}
          </Card.Header>
          <Card.Body>
            <blockquote className='blockquote mb-0'>
              <p>{comment.text}</p>
              <footer className='blockquote-footer'>{moment(comment.date).fromNow()}</footer>
            </blockquote>
            {user && user._id === comment.author._id && (
              <button value={comment._id} onClick={deleteHandler}>
                Delete comment
              </button>
            )}
          </Card.Body>
        </Card>
      );
    });

  return <div>{commentElement}</div>;
};

CommentCard.propTypes = {
  event: PropTypes.object,
  editEvent_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  event: state.events.event
});

export default connect(
  mapStateToProps,
  { editEvent_ACTION }
)(CommentCard);
