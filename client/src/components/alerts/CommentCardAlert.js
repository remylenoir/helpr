import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { editAlert_ACTION } from '../../actions/alerts';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const CommentCardAlert = ({ alert, user, editAlert_ACTION }) => {
  const alertData = {
    type: alert && alert.type,
    title: alert && alert.title,
    description: alert && alert.description,
    imageURL: alert && alert.imageURL,
    comments: alert && alert.comments
  };

  const deleteHandler = e => {
    const { value } = e.target;
    e.preventDefault();
    const filteredComments = alert && alert.comments.filter(commentEl => commentEl._id !== value);
    alertData.comments = filteredComments;
    editAlert_ACTION(alert._id, alertData);
  };

  const commentElement =
    alert &&
    alert.comments.map(comment => {
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
      {alert && commentElement.length > 0 ? (
        commentElement
      ) : (
        <p className='mb-0'>Be the first to comment.</p>
      )}
    </div>
  );
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
