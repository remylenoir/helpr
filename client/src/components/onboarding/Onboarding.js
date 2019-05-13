import React from 'react';
import Hero from './Hero';
import Features from './Features';

const Onboarding = () => {
  return (
    <div>
      <Hero
        details={false}
        title={'Helpr.'}
        msg={'Helping people just got easier!'}
        button={true}
        btnMsg={'Get involve now!'}
        url={'https://source.unsplash.com/random'}
      />

      <Features />
    </div>
  );
};

export default Onboarding;
