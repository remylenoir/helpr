import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux actions
import { getAllEvents_ACTION } from '../../actions/events';

// App components
import EventPreview from './EventPreview';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const EventList = ({ getAllEvents_ACTION }) => {
  useEffect(() => {
    getAllEvents_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className='inner-view py-3' fluid>
      <Row>
        <Container>
          <h1>All events</h1>
          <hr />
        </Container>
      </Row>
      <Row>
        <Container>
          <EventPreview />
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
