import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Redux actions
import { setAlert_ACTION } from '../../actions/alert';
import { createEvent_ACTION } from '../../actions/events';

// App components
import DatePicker from '../layout/DatePicker';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const CreateEvent = ({ auth: { user }, events, createEvent_ACTION, setAlert_ACTION }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    shortDesc: '',
    fullDesc: '',
    street: '',
    city: '',
    zipcode: '',
    coverImage: ''
  });

  if (events && events.isCreated) {
    return <Redirect to='/dashboard' />;
  }

  const { title, date, shortDesc, fullDesc, street, city, zipcode, coverImage } = formData;

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const onChangeDate = event => {
  //   const date = event._d;

  //   setFormData({
  //     ...formData,
  //     date
  //   });
  // };

  // const onSaveDate = event => {
  //   console.log('saved', moment(date).format('llll'));
  // };

  const onSubmit = e => {
    e.preventDefault();

    if (
      title === '' ||
      // date === '' ||
      shortDesc === '' ||
      fullDesc === '' ||
      street === '' ||
      city === '' ||
      zipcode === '' ||
      coverImage === ''
    ) {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    createEvent_ACTION(formData, user._id);
    setAlert_ACTION('Event successfully created');
    console.log(formData);
  };

  return (
    <div>
      <Fragment>
        <Container className='py-3 inner-view'>
          <h1>Create an event</h1>
          <hr />
          <Form
            className='d-flex w-100 pt-3 justify-content-center flex-column add-edit-form'
            onSubmit={onSubmit}
          >
            <Form.Group>
              <Form.Label htmlFor='title'>Title</Form.Label>
              <Form.Control type='text' name='title' value={title} onChange={onChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='date'>Date</Form.Label>
              <DatePicker />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='shortDesc'>Short description</Form.Label>
              <Form.Control
                as='textarea'
                rows='1'
                name='shortDesc'
                value={shortDesc}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='fullDesc'>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                name='fullDesc'
                value={fullDesc}
                onChange={onChange}
              />
            </Form.Group>

            <h3>Address</h3>
            <Form.Group>
              <Form.Label htmlFor='street'>Street</Form.Label>
              <Form.Control type='text' name='street' value={street} onChange={onChange} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor='city'>City</Form.Label>
                <Form.Control type='text' name='city' value={city} onChange={onChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label htmlFor='zipcode'>Zip</Form.Label>
                <Form.Control type='number' name='zipcode' value={zipcode} onChange={onChange} />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label htmlFor='coverImage'>Image</Form.Label>
              <Form.Control type='file' name='coverImage' value={coverImage} onChange={onChange} />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Create the alert
            </Button>
          </Form>
        </Container>
      </Fragment>
    </div>
  );
};

CreateEvent.propTypes = {
  auth: PropTypes.object,
  events: PropTypes.object,
  createEvent_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});

export default connect(
  mapStateToProps,
  { createEvent_ACTION, setAlert_ACTION }
)(CreateEvent);
