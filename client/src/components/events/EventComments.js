import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEvent_ACTION } from '../../actions/events';
import CommentCard from './CommentCard';

const EventComments = ({ event, user, editEvent_ACTION }) => {
  const [commentData, setCommentData] = useState({
    text: '',
    author: ''
  });

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

  const onChange = e => {
    const { value } = e.target;

    user &&
      setCommentData({
        ...commentData,
        text: value,
        author: user
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    event && eventData.comments.push(commentData);
    editEvent_ACTION(event._id, eventData);
    setCommentData({
      text: '',
      author: ''
    });
  };

  const userContent = (
    <Fragment>
      <CommentCard />
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='comment'
          value={commentData.text}
          onChange={onChange}
        />
      </form>
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      <p className='m-0'>
        <Link to='/login'>Log in</Link> to see comments
      </p>
    </Fragment>
  );

  return (
    <div>
      <h2>Comments</h2>
      {user ? userContent : guestContent}
    </div>
  );
};

EventComments.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object,
  editEvent_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.events.event,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { editEvent_ACTION }
)(EventComments);
