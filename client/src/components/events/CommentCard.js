import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEvent_ACTION } from '../../actions/events';

const CommentCard = ({ event, editEvent_ACTION }) => {
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
    const filteredComments =
      event && event.comments.filter(commentEl => commentEl._id !== value);
    eventData.comments = filteredComments;
    editEvent_ACTION(event._id, eventData);
  };
  const commentElement =
    event &&
    event.comments.map(comment => {
      return (
        <Fragment key={comment._id}>
          <button value={comment._id} onClick={deleteHandler}>
            Delete comment
          </button>
          <p>{comment.author.firstName}</p>
          <p>{comment.date}</p>
          <img src={comment.author.profilePicture} alt='profile-pic' />
          <p>{comment.text}</p>
        </Fragment>
      );
    });

  return <div>{commentElement}</div>;
};

CommentCard.propTypes = {
  event: PropTypes.object,
  profile: PropTypes.object,
  editEvent_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  event: state.events.event
});

export default connect(
  mapStateToProps,
  { editEvent_ACTION }
)(CommentCard);
