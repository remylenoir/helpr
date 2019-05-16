import React, { Fragment } from 'react';
import Feature from './Feature';
import Plx from 'react-plx';

const Features = () => {
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
      <div className='features-wrapper'>
        <div className='col-sm'>
          <Plx parallaxData={parallaxDataLeft}>
            <Feature
              icon={'fa-hands-helping'}
              title={'Voluteering events'}
              desc={'helping each other is good bla bla'}
            />
          </Plx>
          <div className='col-sm'>
            <Plx parallaxData={parallaxDataLeft}>
              <Feature
                icon={'fa-link'}
                title={'Send alert when for people in need'}
                desc={'helping each other is good bla bla'}
              />
            </Plx>
          </div>
          <div className='col-sm'>
            <Plx parallaxData={parallaxDataLeft}>
              <Feature
                icon={'fa-hand-holding-heart'}
                title={'Create your own event'}
                desc={'helping each other is good bla bla'}
              />
            </Plx>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Features;
