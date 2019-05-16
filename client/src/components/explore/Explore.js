/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux actions
import { getAllAlerts_ACTION } from '../../actions/alerts';
import { getAllEvents_ACTION } from '../../actions/events';

// App components
import AlertPreview from '../alerts/AlertPreview';
import EventPreview from '../events/EventPreview';
import Subtitle from '../layout/Headings/Subtitle';
import OurFontAwesome from '../layout/OurFontAwesome';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Explore = ({
  alerts,
  events,
  getAllAlerts_ACTION,
  getAllEvents_ACTION
}) => {
  useEffect(() => {
    getAllAlerts_ACTION();
    getAllEvents_ACTION();
    window.scroll(0, 0)
  }, []);

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
          <Subtitle title={'New Alerts'} />
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
          <Subtitle title={'Next Events'} />
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

Explore.propTypes = {
  alerts: PropTypes.object,
  events: PropTypes.object,
  getAllAlerts_ACTION: PropTypes.func.isRequired,
  getAllEvents_ACTION: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts,
  events: state.events
});

export default connect(
  mapStateToProps,
  { getAllAlerts_ACTION, getAllEvents_ACTION }
)(Explore);
