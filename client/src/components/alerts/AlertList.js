import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FadeIn from 'react-fade-in';

// Redux actions
import { getAllAlerts_ACTION } from '../../actions/alerts';

// App components
import AlertPreview from './AlertPreview';
import FilteredAlertPrev from './FilteredAlertPrev';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const AlertList = ({ getAllAlerts_ACTION }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [type, setType] = useState('All');

  const onChange = event => {
    const { name, value } = event.target;

    setType(value);
    console.log(value);
  };

  return (
    <Container className='inner-view py-3' fluid>
      <Row>
        <Container>
          <FadeIn>
            <h1>All alerts</h1>
            <hr />
          </FadeIn>
        </Container>

        <Container>
          <FadeIn>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control as='select' onChange={onChange} name='type'>
                <option value={'All'} onChange={onChange}>
                  All
                </option>
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
          </FadeIn>
        </Container>
      </Row>

      <Row>
        <Container>
          <FadeIn>
            {type === 'All' && <AlertPreview />}
            <FilteredAlertPrev typeFilter={type} />
          </FadeIn>
        </Container>
      </Row>
    </Container>
  );
};

AlertList.propTypes = {
  getAllAlerts_ACTION: PropTypes.func.isRequired
};

export default connect(
  null,
  { getAllAlerts_ACTION }
)(AlertList);
