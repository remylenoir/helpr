import React, { Fragment } from 'react';
import Feature from './Feature';

const Features = () => {
  return (
    <Fragment>
      <div className='features-wrapper'>
        <div className='col-sm'>
          <Feature
            icon={'fa-hands-helping'}
            title={'Voluteering events'}
            desc={'helping each other is good bla bla'}
          />
          <div className='col-sm'>
            <Feature
              icon={'fa-link'}
              title={'Send alert when for people in need'}
              desc={'helping each other is good bla bla'}
            />
          </div>
          <div className='col-sm'>
            <Feature
              icon={'fa-hand-holding-heart'}
              title={'Create your own event'}
              desc={'helping each other is good bla bla'}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Features;
