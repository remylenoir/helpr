// import React, { useEffect } from 'react';
// import MapGL, { NavigationControl } from 'react-map-gl';

// const TOKEN =
//   'pk.eyJ1Ijoia2FtaWN1dCIsImEiOiJMVzF2NThZIn0.WO0ArcIIzYVioen3HpfugQ';

// const navStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   padding: '10px'
// };

// const map = props => {
//   let state = {
//     viewport: {
//       latitude: 37.785164,
//       longitude: -100,
//       zoom: 2.8,
//       bearing: 0,
//       pitch: 0,
//       width: 500,
//       height: 500
//     }
//   };

//   const { viewport } = state;

//   return (
//     <div>
//       <MapGL
//         {...viewport}
//         mapStyle='mapbox://styles/mapbox/dark-v9'
//         mapboxApiAccessToken={TOKEN}
//       >
//         <div className='nav' style={navStyle}>
//           <NavigationControl />
//         </div>
//       </MapGL>
//     </div>
//   );
// };

// export default map;
