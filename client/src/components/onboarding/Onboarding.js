import React, { Fragment } from 'react';
import Hero from './Hero';
import Features from './Features';
import HorizontalScroll from './HorizontalScroll';

const Onboarding = () => {
  return (
    <Fragment>
      <Hero
        details={false}
        title={'Helpr.'}
        msg={'Helping people just got easier!'}
        button={true}
        btnMsg={'Get involve now!'}
        url={'https://source.unsplash.com/random'}
      />
      <Features />
      <HorizontalScroll />
    </Fragment>
  );
};

export default Onboarding;
