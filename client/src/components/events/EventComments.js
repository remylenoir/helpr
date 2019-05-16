import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { editEvent_ACTION, getEvent_ACTION } from '../../actions/events';

// App components
import CommentCard from './CommentCard';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EventComments = ({ event, user, editEvent_ACTION, getEvent_ACTION }) => {
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
    editEvent_ACTION(event._id, eventData).then(res => getEvent_ACTION(event._id));
    setCommentData({
      text: '',
      author: ''
    });
  };

  const userContent = (
    <Fragment>
      <CommentCard />

      <Form
        className='d-flex w-100 pt-1 justify-content-center flex-column add-edit-form'
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
        <Link to='/login' className='text-primary'>
          Log in
        </Link>{' '}
        to see comments
      </p>
    </Fragment>
  );

  return <Fragment>{user ? userContent : guestContent}</Fragment>;
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
  { editEvent_ACTION, getEvent_ACTION }
)(EventComments);
