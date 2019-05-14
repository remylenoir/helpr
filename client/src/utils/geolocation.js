import React from 'react';
import { geolocated } from 'react-geolocated';

const geolocatedFunc = () =>
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  });

export default geolocatedFunc;
