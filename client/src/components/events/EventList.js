import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { getAllEvents_ACTION } from '../../actions/events';

// App components
import EventPreview from './EventPreview';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FilteredEventPrev from './FilteredEventPrev';
import Form from 'react-bootstrap/Form';

const EventList = ({ getAllEvents_ACTION }) => {
  useEffect(() => {
    getAllEvents_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [category, setCategory] = useState('All');

  const onChange = event => {
    const { name, value } = event.target;

    setCategory(value);
    console.log(value);
  };

  return (
    <Container className='inner-view py-3' fluid>
      <Row>
        <Container>
          <h1>All events</h1>
          <hr />
        </Container>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control as='select' onChange={onChange} name='categories'>
            <option value={'All'} onChange={onChange}>
              All
            </option>
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
      </Row>
      <Row>
        <Container>
          {category === 'All' && <EventPreview />}
          <FilteredEventPrev categoryFilter={category} />
        </Container>
      </Row>
    </Container>
  );
};

EventList.propTypes = {
  getAllEvents_ACTION: PropTypes.func
};

export default connect(
  null,
  { getAllEvents_ACTION }
)(EventList);
