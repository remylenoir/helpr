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
import { editEvent_ACTION, deleteEvent_ACTION, uploadEventImg_ACTION } from '../../actions/events';

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
  uploadEventImg_ACTION,
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    date: '',
    categories: '',
    venue: '',
    street: '',
    city: '',
    zipcode: '',
    coverImage: ''
  });

  const { title, shortDesc, fullDesc, venue, street, categories, city, zipcode, coverImage } = formData;

  useEffect(() => {
    setFormData({
      date: loading || !date ? '' : date,
      title: loading || !event.title ? '' : event.title,
      fullDesc: loading || !event.fullDesc ? '' : event.fullDesc,
      shortDesc: loading || !event.shortDesc ? '' : event.shortDesc,
      categories: loading || !event.categories ? '' : event.categories,
      venue: loading || !event.venue ? '' : event.venue,
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

  const onUpload = e => {
    const file = e.target.files[0];
    const data = new FormData();

    data.append('coverImage', file);
    uploadEventImg_ACTION(data);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      title === '' ||
      shortDesc === '' ||
      fullDesc === '' ||
      categories === '' ||
      date === '' ||
      venue === '' ||
      street === '' ||
      city === '' ||
      zipcode === '' ||
      coverImage === ''
    ) {
      setAlert_ACTION('All inputs must be filled', 'danger');
      return;
    }

    editEvent_ACTION(event._id, formData);
    setAlert_ACTION('Changes have been saved', 'success');

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

          <h1>Edit the event</h1>
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
              <Form.Label htmlFor='coverImage'>Image</Form.Label>
              <br />
              <div className='w-100 event-image mb-3'>
                <img src={coverImage} alt='' />
              </div>
              <input type='file' name='coverImage' onChange={onUpload} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as='select' onChange={onChange} name='categories'>
                <option value={''} onChange={onChange} />
                <option value={'Homelessness & Poverty'} onChange={onChange}>
                  Homelessness and Poverty
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
                name={date}
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
  { editEvent_ACTION, deleteEvent_ACTION, setAlert_ACTION, uploadEventImg_ACTION }
)(EditEvent);
