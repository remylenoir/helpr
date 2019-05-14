import React, { Fragment } from 'react';
import Hero from './Hero';
import Features from './Features';
import HorizontalScroll from './HorizontalScroll';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Onboarding = () => {
  return (
    <Fragment>
      <Row className='onboarding-container'>
        <Container fluid>
          <Row>
            <Hero
              details={false}
              title={'Helpr.'}
              msg={'Helping people just got easier!'}
              button={true}
              btnMsg={'Get involve now!'}
              url={'https://source.unsplash.com/random'}
            />
          </Row>
          <Features />
          <Row>
            <HorizontalScroll title={'Volunteer work near by'} btnText={'See more'} />
          </Row>
        </Container>
      </Row>
    </Fragment>
  );
};

export default Onboarding;
