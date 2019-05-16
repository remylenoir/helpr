import React, { useEffect, Fragment } from 'react';
import Plx from 'react-plx';

// App components
import Hero from '../layout/Hero';
import Features from './Features';
import HorizontalScroll from './HorizontalScroll';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import AlertWithMap from './AlertWithMap';
import Container from 'react-bootstrap/Container';

const Onboarding = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  const parallaxDataLeft = [
    {
      start: 'self',
      end: 'self',
      endOffset: '70vh',

      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
        }
      ]
    }
  ];

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
              btnMsg={'Get involved now!'}
              url={'https://source.unsplash.com/random'}
              btnLink={'/explore'}
            />
          </Row>

          <Features />
          {/* if type is all, show all events, if type is 'category name' it would only show the category */}
          <Plx parallaxData={parallaxDataLeft}>
            <Row>
              <HorizontalScroll
                headingTitle={'Volunteer work near by'}
                btnText={'See more'}
                type={'all'}
              />
            </Row>
          </Plx>
          <Plx parallaxData={parallaxDataLeft}>
            <AlertWithMap
              sectionTitle={'Help people who are in need'}
              btnText={'See all the alerts'}
              desc={'Interact with the alerts in the map, arise awareness, and take action!'}
              btnLink={'alert/all'}
            />
          </Plx>
          {/* <Plx parallaxData={parallaxDataLeft}>
            <Row>
              <HorizontalScroll
                headingTitle={'More events'}
                btnText={'See more'}
                type={'all'}
              />
            </Row>
          </Plx> */}
        </Container>
      </Row>
    </Fragment>
  );
};

export default Onboarding;
