import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux components
import { editAlert_ACTION } from '../../actions/alerts';

// App components
import CommentCardAlert from './CommentCardAlert';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    comments: alert && alert.comments
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

      <Form
        className='d-flex w-100 pt-2 justify-content-center flex-column add-edit-form'
        onSubmit={onSubmit}
      >
        <Form.Group>
          <hr />
          <Form.Label htmlFor='shortDesc' className='mt-2'>
            Add a comment
          </Form.Label>
          <Form.Control
            as='textarea'
            rows='2'
            name='comment'
            value={commentData.text}
            onChange={onChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Send comment
        </Button>
      </Form>
    </Fragment>
  );

  const guestContent = (
    <Fragment>
      <p className='m-0'>
        <Link to='/login'>Log in</Link> to see comments
      </p>
    </Fragment>
  );

  return <Fragment>{user ? userContent : guestContent}</Fragment>;
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
