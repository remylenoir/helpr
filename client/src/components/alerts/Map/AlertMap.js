import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import Popups from './Popups';

const TOKEN =
  'pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w';

const Map = ({ height, width, alert }) => {
  const [mapState, setMapState] = useState({
    viewport: {
      latitude: alert.coordinates[0],
      longitude: alert.coordinates[1],
      zoom: 14,
      bearing: 0,
      pitch: 0,
      height,
      width
    }
  });

  return (
    <div id='map'>
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle='mapbox://styles/baguettedimsum/cjuv99moz0e201fqmhojp2soe'
        onViewportChange={viewport => setMapState({ viewport })}
      >
        <Popups alert={alert && alert} />
      </ReactMapGL>
    </div>
  );
};

export default Map;
