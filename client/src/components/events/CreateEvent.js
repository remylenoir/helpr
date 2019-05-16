import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

// Date Picker
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

// Redux actions
import { setAlert_ACTION } from '../../actions/alert';
import { createEvent_ACTION } from '../../actions/events';
import { uploadEventImg_ACTION } from '../../actions/events';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const CreateEvent = ({
  auth: { user },
  events,
  createEvent_ACTION,
  setAlert_ACTION,
  uploadEventImg_ACTION
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date(),
    categories: '',
    shortDesc: '',
    fullDesc: '',
    venue: '',
    street: '',
    city: '',
    zipcode: '',
    coverImage: ''
  });

  if (events && events.isCreated) {
    return <Redirect to='/dashboard' />;
  }

  const {
    title,
    date,
    categories,
    shortDesc,
    fullDesc,
    venue,
    street,
    city,
    zipcode,
    coverImage
  } = formData;

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onChangeDate = event => {
    const date = moment(event[0]).format();

    setFormData({
      ...formData,
      date
    });
  };

  const onUpload = e => {
    const file = e.target.files[0];
    const data = new FormData();

    data.append('coverImage', file);
    uploadEventImg_ACTION(data);

    setFormData({
      ...formData,
      coverImage: events.coverImage
    });
    console.log(events.coverImage);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      title === '' ||
      date === '' ||
      shortDesc === '' ||
      categories === '' ||
      fullDesc === '' ||
      venue === '' ||
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
              <img src={coverImage} alt='' />
              <input type='file' name='coverImage' onChange={onUpload} />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='title'>Title</Form.Label>
              <Form.Control type='text' name='title' value={title} onChange={onChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as='select' onChange={onChange} name='categories'>
                <option value={''} onChange={onChange} />
                <option value={'Homlessness & Poverty'} onChange={onChange}>
                  Homlessness and Poverty
                </option>
                <option value={'Refugees'} onChange={onChange}>
                  Refugees
                </option>
                <option value={'Migrants'} onChange={onChange}>
                  Migrants
                </option>
                <option value={'Seniors'} onChange={onChange}>
                  Seniors
                </option>
                <option value={'Children and Young Adults'} onChange={onChange}>
                  Children and Young Adults
                </option>
                <option value={'Environment and Animals'} onChange={onChange}>
                  Environment and Animals
                </option>
                <option value={'Political Activism'} onChange={onChange}>
                  Political Activism
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='date'>Date</Form.Label>
              <br />
              <Flatpickr
                className='datepicker form-control'
                data-enable-time
                name='date'
                value={date}
                onChange={onChangeDate}
                options={{
                  disableMobile: true,
                  minTime: '09:00',
                  maxTime: '23:00',
                  locale: {
                    firstDayOfWeek: 1
                  }
                }}
              />
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
              <Form.Label htmlFor='venue'>Venue</Form.Label>
              <Form.Control type='text' name='venue' value={venue} onChange={onChange} />
            </Form.Group>

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
  { createEvent_ACTION, setAlert_ACTION, uploadEventImg_ACTION }
)(CreateEvent);
