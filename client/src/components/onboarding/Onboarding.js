import React, { Fragment } from 'react';
import Hero from './Hero';

const Onboarding = () => {
  return (
    <Fragment>
      <Hero
        title={'Helpr.'}
        msg={'Helping people just got easier!'}
        button={true}
        btnMsg={'Get involve now!'}
        url={'https://source.unsplash.com/random'}
      />
    </Fragment>
  );
};

export default Onboarding;
