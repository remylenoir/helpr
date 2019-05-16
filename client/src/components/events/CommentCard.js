import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { editEvent_ACTION, getEvent_ACTION } from '../../actions/events';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const CommentCard = ({ event, user, editEvent_ACTION, getEvent_ACTION }) => {
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

    editEvent_ACTION(event._id, eventData).then(res => getEvent_ACTION(event._id));
  };

  const commentElement =
    event &&
    event.comments.map(comment => {
      return (
        <Card key={comment._id} className='comment mb-3'>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <div>
              <Image
                variant='top'
                src={comment.author.profilePicture}
                className='attendee-profile mr-1'
              />{' '}
              {comment.author.username}
            </div>
            <div>
              {user && user._id === comment.author._id && (
                <button
                  className='delete-button btn btn-danger'
                  value={comment._id}
                  onClick={deleteHandler}
                >
                  Delete comment
                </button>
              )}
            </div>
          </Card.Header>
          <Card.Body className='py-3'>
            <blockquote className='blockquote mb-0'>
              <p className='mb-0'>{comment.text}</p>
              <footer className='blockquote-footer'>{moment(comment.date).fromNow()}</footer>
            </blockquote>
          </Card.Body>
        </Card>
      );
    });

  return (
    <div>
      {event && commentElement.length > 0 ? (
        commentElement
      ) : (
        <p className='mb-0'>Be the first to comment.</p>
      )}
    </div>
  );
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
  { editEvent_ACTION, getEvent_ACTION }
)(CommentCard);
