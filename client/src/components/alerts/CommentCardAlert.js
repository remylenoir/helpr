import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editAlert_ACTION } from '../../actions/alerts';

const CommentCardAlert = ({ alert, user, editAlert_ACTION }) => {
  const alertData = {
    type: alert && alert.type,
    title: alert && alert.title,
    description: alert && alert.description,
    imageURL: alert && alert.imageURL,
    comments: alert && alert.comments,
  };

  const deleteHandler = e => {
    const { value } = e.target;
    e.preventDefault();
    const filteredComments =
      alert && alert.comments.filter(commentEl => commentEl._id !== value);
    alertData.comments = filteredComments;
    editAlert_ACTION(alert._id, alertData);
  };

  const commentElement =
    alert &&
    alert.comments.map(comment => {
      return (
        <Fragment key={comment._id}>
        {user && user._id === comment.author._id &&
          <button value={comment._id} onClick={deleteHandler}>
            Delete comment
          </button>
        }
          <p>{comment.author.firstName}</p>
          <p>{comment.date}</p>
          <img src={comment.author.profilePicture} alt='profile-pic' />
          <p>{comment.text}</p>
        </Fragment>
      );
    });

  return <div>{commentElement}</div>;
};

CommentCardAlert.propTypes = {
  alert: PropTypes.object,
  user: PropTypes.object,
  editAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  alert: state.alerts.alert
});

export default connect(
  mapStateToProps,
  { editAlert_ACTION }
)(CommentCardAlert);
