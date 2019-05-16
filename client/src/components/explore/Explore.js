/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { getAllAlerts_ACTION } from '../../actions/alerts';
import { getAllEvents_ACTION } from '../../actions/events';

// App components
import Search from '../layout/Search';
import AlertPreview from '../alerts/AlertPreview';
import EventPreview from '../events/EventPreview';
import Subtitle from '../layout/Headings/Subtitle';
import OurFontAwesome from '../layout/OurFontAwesome';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Explore = ({ alerts, events, getAllAlerts_ACTION, getAllEvents_ACTION }) => {
  useEffect(() => {
    getAllAlerts_ACTION();
    getAllEvents_ACTION();
  }, []);

  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <Container className='inner-view py-3' fluid>
      <Row>
        <Link to='/search' className='explore-search'>
          <OurFontAwesome icon={'fa-search'} />
        </Link>
      </Row>
      <Row>
        <Container>
          <h1>Explore Helpr</h1>
          <hr />
        </Container>
      </Row>

      <Row>
        <Container fluid>
          <Subtitle title={'Active Alerts'} />
          <Row>
            <div className='horizontal-scroll'>
              <div className='horizontal-scroll-wrapper'>
                <AlertPreview />
              </div>
            </div>
          </Row>
        </Container>
      </Row>

      <Row>
        <Container fluid>
          <Subtitle title={'Active Events'} />
          <Row>
            <div className='horizontal-scroll'>
              <div className='horizontal-scroll-wrapper'>
                <EventPreview />
              </div>
            </div>
          </Row>
        </Container>
      </Row>

      <Row>
        <Container fluid>
          <Subtitle title={'Categories'} />
          <Row>TODO</Row>
        </Container>
      </Row>
    </Container>
  );
};

Explore.propTypes = {};

const mapStateToProps = state => ({
  alerts: state.alerts,
  events: state.events
});

export default connect(
  mapStateToProps,
  { getAllAlerts_ACTION, getAllEvents_ACTION }
)(Explore);
