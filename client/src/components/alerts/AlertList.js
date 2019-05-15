import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllAlerts_ACTION } from '../../actions/alerts';
import AlertPreview from './AlertPreview';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AlertList = ({ getAllAlerts_ACTION }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className='py-3' fluid>
      <Row>
        <Container>
          <h1>All alerts</h1>
          <hr />
        </Container>
      </Row>
      <Row>
        <Container>
          <AlertPreview />
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
