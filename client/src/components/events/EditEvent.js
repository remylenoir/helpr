import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Date Picker
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

// Redux actions
import { setAlert_ACTION } from '../../actions/alert';
import { editEvent_ACTION, deleteEvent_ACTION } from '../../actions/events';

// App components
import Spinner from '../layout/Spinner';
import BackLink from '../layout/BackLink';

// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const EditEvent = ({
  events: { event, date, loading, isDeleted },
  editEvent_ACTION,
  deleteEvent_ACTION,
  setAlert_ACTION,
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    date: '',
    street: '',
    city: '',
    zipcode: '',
    coverImage: ''
  });

  const { title, shortDesc, fullDesc, street, city, zipcode, coverImage } = formData;

  useEffect(() => {
    setFormData({
      date: loading || !date ? '' : date,
      title: loading || !event.title ? '' : event.title,
      fullDesc: loading || !event.fullDesc ? '' : event.fullDesc,
      shortDesc: loading || !event.shortDesc ? '' : event.shortDesc,
      street: loading || !event.street ? '' : event.street,
      city: loading || !event.city ? '' : event.city,
      zipcode: loading || !event.zipcode ? '' : event.zipcode,
      coverImage: loading || !event.coverImage ? '' : event.coverImage
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSubmit = e => {
    e.preventDefault();

    if (
      title === '' ||
      shortDesc === '' ||
      fullDesc === '' ||
      date === '' ||
      street === '' ||
      city === '' ||
      zipcode === '' ||
      coverImage === ''
    ) {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    editEvent_ACTION(event._id, formData);
    setAlert_ACTION('Changes have been saved');

    history.push(`/event/${event._id}`);
  };

  const handleDelete = e => {
    e.preventDefault();

    //Send delete action to reducer
    deleteEvent_ACTION(event._id);
  };

  if (isDeleted) {
    return <Redirect to='/dashboard' />;
  }

  return loading && event === null ? (
    <Spinner />
  ) : (
    <div>
      <Fragment>
        <Container className='py-3 inner-view'>
          <BackLink url={`/event/${event._id}`} title={'Back to the event'} />

          <h1>Edit the alert</h1>
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
              <br />
              <Flatpickr
                className='datepicker form-control'
                data-enable-time
                name={date}
                value={date}
                onChange={onChangeDate}
                options={{
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

            <ButtonToolbar className='justify-content-around py-3'>
              <Button variant='primary' type='submit'>
                Update
              </Button>
              <Button variant='danger' type='submit' onClick={handleDelete}>
                Delete
              </Button>
            </ButtonToolbar>
          </Form>
        </Container>
        {/*         
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input type='text' name='title' value={title} onChange={onChange} />
          </div>
          <div>
            <label>Description</label>
            <input type='text' name='description' value={fullDesc} onChange={onChange} />
          </div>
          <div>
            <label>Image</label>
            <input type='text' name='coverImage' value={coverImage} onChange={onChange} />
          </div>
          <input type='submit' value='Confirm Edit' />
        </form>
        <Link to={`/event/${event._id}`}>Back to event details</Link>
        <button onClick={handleDelete}>Delete event</button> */}
      </Fragment>
    </div>
  );
};

EditEvent.propTypes = {
  events: PropTypes.object,
  editEvent_ACTION: PropTypes.func.isRequired,
  deleteEvent_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { editEvent_ACTION, deleteEvent_ACTION, setAlert_ACTION }
)(EditEvent);
