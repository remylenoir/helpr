import React, { useEffect, useState } from 'react';
import ReactMapGL, { NavigationControl, FullscreenControl } from 'react-map-gl';
import Popups from '../map/Popups';

const TOKEN =
  'pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w';

const Map = ({ fullScreenControl, navControl }) => {
  const [mapState, setMapState] = useState({
    viewport: {
      latitude: 52.52,
      longitude: 13.405,
      zoom: 8,
      bearing: 0,
      pitch: 0,
      height: 320,
      width: window.innerWidth
    }
  });
  const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };

  const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
  };
  return (
    <div id='map'>
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle='mapbox://styles/baguettedimsum/cjuv99moz0e201fqmhojp2soe'
        onViewportChange={viewport => setMapState({ viewport })}
      >
        <Popups />
        {fullScreenControl && (
          <div className='fullscreen' style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
        )}
        {navControl && (
          <div className='nav' style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => setMapState({ viewport })}
            />
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
