import React, { Fragment } from 'react';
import Map from '../map/Map';
import FadeIn from 'react-fade-in';

const MapView = () => {
  return (
    <Fragment>
      <FadeIn>
        <Map
          navControl={true}
          height={window.innerHeight - 60 - 40}
          width={window.innerWidth}
        />
      </FadeIn>
    </Fragment>
  );
};

export default MapView;
