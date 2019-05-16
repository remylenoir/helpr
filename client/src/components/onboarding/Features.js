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
              desc={'Know what volunteering events are happening near to you and easily join them'}
            />
          </Plx>
          <div className='col-sm'>
            <Plx parallaxData={parallaxDataLeft}>
              <Feature
                icon={'fa-link'}
                title={'Send alert when for people in need'}
                desc={'Whether there is people in need or places to be taken care of, send alert and arise awareness'}
              />
            </Plx>
          </div>
          <div className='col-sm'>
            <Plx parallaxData={parallaxDataLeft}>
              <Feature
                icon={'fa-hand-holding-heart'}
                title={'Create your own event'}
                desc={'Create your volunteering events, get together with other people and create a better community!'}
              />
            </Plx>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Features;
