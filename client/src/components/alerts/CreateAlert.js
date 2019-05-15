import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Redux actions
import { createAlert_ACTION } from '../../actions/alerts';
import { setAlert_ACTION } from '../../actions/alert';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// App utils
import geolocatedFunc from '../../utils/geolocation';

const CreateAlert = ({ auth: { user }, alerts, coords, createAlert_ACTION, setAlert_ACTION }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'People in need',
    location: {},
    description: '',
    imageURL: ''
  });

  const { title, type, location, description, imageURL } = formData;

  useEffect(() => {
    const latitude = coords && coords.latitude;
    const longitude = coords && coords.longitude;

    coords &&
      setFormData({
        ...formData,
        location: {
          type: 'Point',
          coordinates: [latitude, longitude]
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  const onChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (title === '' || description === '' || location === '') {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    createAlert_ACTION(formData, user._id);
    setAlert_ACTION('Alert successfully created');
  };

  if (alerts && alerts.isCreated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container className='py-3 inner-view'>
        <h1>Create an alert</h1>
        <hr />
        <Form
          className='d-flex w-100 pt-3 justify-content-center flex-column add-edit-form'
          onSubmit={onSubmit}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' name='title' value={title} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control as='select' name='type'>
              <option value={type} onChange={onChange}>
                People in need
              </option>
              <option value={type} onChange={onChange}>
                Places
              </option>
              <option value={type} onChange={onChange}>
                Other
              </option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='description'
              value={description}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' name='image' value={imageURL} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              disabled
              type='text'
              name='location'
              value={location.coordinates || ''}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Create the alert
          </Button>
        </Form>
      </Container>

      {/* <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input type='text' name='title' value={title} onChange={onChange} />
          </div>
          <div>
            <select name='type'>
              <option value={type} onChange={onChange}>
                People in need
              </option>
              <option value={type} onChange={onChange}>
                Places
              </option>
              <option value={type} onChange={onChange}>
                Other
              </option>
            </select>
          </div>
          <div>
            <label>Description</label>
            <input type='text' name='description' value={description} onChange={onChange} />
          </div>
          <div>
            <label>Location</label>
            <input type='text' name='location' value={location.coordinates || ''} onChange={onChange} />
          </div>
          <div>
            <label>Image</label>
            <input type='text' name='imageURL' value={imageURL} onChange={onChange} />
          </div>
          <input type='submit' value='Create Alert' /> 
        </form>*/}
    </Fragment>
  );
};

CreateAlert.propTypes = {
  auth: PropTypes.object,
  alerts: PropTypes.object,
  createAlert_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  alerts: state.alerts
});

const reduxConnect = () =>
  connect(
    mapStateToProps,
    { createAlert_ACTION, setAlert_ACTION }
  );

export default compose(
  reduxConnect(),
  geolocatedFunc()
)(CreateAlert);
