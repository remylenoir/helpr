import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FadeIn from 'react-fade-in';

// Redux actions
import { editAlert_ACTION, deleteAlert_ACTION } from '../../actions/alerts';
import { setAlert_ACTION } from '../../actions/alert';

// App components
import Spinner from '../layout/Spinner';
import BackLink from '../layout/BackLink';

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const EditAlert = ({
  alerts: { alert, loading, isDeleted },
  editAlert_ACTION,
  deleteAlert_ACTION,
  setAlert_ACTION,
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: ''
  });

  const { title, type, description } = formData;

  useEffect(() => {
    setFormData({
      title: loading || !alert.title ? '' : alert.title,
      type: loading || !alert.type ? '' : alert.type,
      description: loading || !alert.description ? '' : alert.description
    });
    window.scroll(0, 0);
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
      setAlert_ACTION('All inputs must be filled', 'danger');
      return;
    }

    editAlert_ACTION(alert._id, formData);
    setAlert_ACTION('Changes have been saved', 'success');

    history.push(`/alert/${alert._id}`);
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
    <Fragment>
      <Container className='py-3 inner-view'>
        <FadeIn>
          <BackLink url={`/alert/${alert._id}`} title={'Back to the alert'} />

          <h1>Edit the alert</h1>
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
              <Form.Control as='select' onChange={onChange} name='type'>
                <option value={''} onChange={onChange} />
                <option value={'People in need'} onChange={onChange}>
                  People in need
                </option>
                <option value={'Places'} onChange={onChange}>
                  Places
                </option>
                <option value={'Other'} onChange={onChange}>
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

            <ButtonToolbar className='justify-content-around py-3'>
              <Button variant='primary' type='submit'>
                Update
              </Button>
              <Button variant='danger' type='submit' onClick={handleDelete}>
                Delete
              </Button>
            </ButtonToolbar>
          </Form>
        </FadeIn>
      </Container>
    </Fragment>
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
