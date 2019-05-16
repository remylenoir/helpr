import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editAlert_ACTION } from '../../actions/alerts';
import CommentCardAlert from './CommentCardAlert';

const AlertComments = ({ alert, user, editAlert_ACTION }) => {
  const [commentData, setCommentData] = useState({
    text: '',
    author: ''
  });

  const alertData = {
    type: alert && alert.type,
    title: alert && alert.title,
    description: alert && alert.description,
    imageURL: alert && alert.imageURL,
    comments: alert && alert.comments,
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
    alert && alertData.comments.push(commentData);
    editAlert_ACTION(alert._id, alertData);
    setCommentData({
      text: '',
      author: ''
    });
  };

  const userContent = (
    <Fragment>
      <CommentCardAlert />
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

AlertComments.propTypes = {
  alert: PropTypes.object,
  user: PropTypes.object,
  editAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alerts.alert,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { editAlert_ACTION }
)(AlertComments);
