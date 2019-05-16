import React, { Fragment } from 'react';
import Map from '../map/Map';

const MapView = () => {
  return (
    <Fragment>
      <Map navControl={true} height={window.innerHeight - 60 - 40} width={window.innerWidth} />
    </Fragment>
  );
};

export default MapView;
