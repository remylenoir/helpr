import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { editAlert_ACTION, deleteAlert_ACTION } from '../../actions/alerts';
import { setAlert_ACTION } from '../../actions/alert';

// App components
import Spinner from '../layout/Spinner';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const EditAlert = ({
  alerts: { alert, loading, isDeleted },
  editAlert_ACTION,
  deleteAlert_ACTION,
  setAlert_ACTION
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    imageURL: ''
  });

  const { title, type, description, imageURL } = formData;

  useEffect(() => {
    setFormData({
      title: loading || !alert.title ? '' : alert.title,
      type: loading || !alert.type ? '' : alert.type,
      description: loading || !alert.description ? '' : alert.description,
      imageURL: loading || !alert.imageURL ? '' : alert.imageURL
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

  const onSubmit = e => {
    e.preventDefault();

    if (title === '' || type === '' || description === '') {
      setAlert_ACTION('All inputs must be filled');
      return;
    }

    editAlert_ACTION(alert._id, formData);
    setAlert_ACTION('Changes have been saved');
  };

  const handleDelete = e => {
    e.preventDefault();

    //Send delete action to reducer
    deleteAlert_ACTION(alert._id);
  };

  if (isDeleted) {
    return <Redirect to='/dashboard' />;
  }

  return loading && alert === null ? (
    <Spinner />
  ) : (
    <div>
      <Fragment>
        <Form
          className='container d-flex w-100 pt-3 justify-content-center flex-column add-edit-form'
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

          <ButtonToolbar className='justify-content-around'>
            <Button variant='primary' type='submit'>
              Update
            </Button>
            <Button variant='danger' type='submit' onClick={handleDelete}>
              Delete
            </Button>
          </ButtonToolbar>
        </Form>
        <br />
        <Link to={`/alert/${alert._id}`} className='btn btn-secondary'>
          Back to alert details
        </Link>
        {/*       
        <form onSubmit={onSubmit}>
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
            <label>Image</label>
            <input type='text' name='imageURL' value={imageURL} onChange={onChange} />
          </div>
          <input type='submit' value='Confirm Edit' />
        </form>
        <Link to={`/alert/${alert._id}`}>Back to alert details</Link>
        <button onClick={handleDelete}>Delete Alert</button> */}
      </Fragment>
    </div>
  );
};

EditAlert.propTypes = {
  editAlert_ACTION: PropTypes.func.isRequired,
  deleteAlert_ACTION: PropTypes.func.isRequired,
  setAlert_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { editAlert_ACTION, deleteAlert_ACTION, setAlert_ACTION }
)(EditAlert);
