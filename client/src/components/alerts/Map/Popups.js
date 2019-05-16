import React from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin';

const Popups = ({ alert }) => {
  return (
    <div id='my-map'>
      <Marker latitude={alert && alert.coordinates[0]} longitude={alert && alert.coordinates[1]}>
        <Pin size={45} />
      </Marker>
    </div>
  );
};

export default Popups;
