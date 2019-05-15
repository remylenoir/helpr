import React, { Fragment } from 'react';

// App components
import Hero from '../layout/Hero';
import Features from './Features';
import HorizontalScroll from './HorizontalScroll';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import AlertWithMap from './AlertWithMap';
import Container from 'react-bootstrap/Container';

const Onboarding = () => {
  return (
    <Fragment>
      <Row className='onboarding-container'>
        <Container fluid>
          <Row>
            <Hero
              type={'home'}
              title={'Helpr.'}
              msg={'Helping people just got easier!'}
              button={true}
              btnMsg={'Get involve now!'}
              url={'https://source.unsplash.com/random'}
            />
          </Row>
          <Features />
          {/* if type is all, show all events, if type is 'category name' it would only show the category */}
          <Row>
            <HorizontalScroll
              headingTitle={'Volunteer work near by'}
              btnText={'See more'}
              type={'all'}
            />
          </Row>
          <Row>
            <HorizontalScroll headingTitle={'More events'} btnText={'See more'} type={'all'} />
          </Row>

          <AlertWithMap
            sectionTitle={'Help people who are in need'}
            btnText={'See all help alerts'}
            desc={'tenetur quisquam reiciendis esse quam corporis eum.'}
          />
        </Container>
      </Row>
    </Fragment>
  );
};

export default Onboarding;
