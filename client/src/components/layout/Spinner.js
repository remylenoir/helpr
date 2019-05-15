import React, { Fragment } from 'react';

import Spinner from 'react-bootstrap/Spinner';

export default () => (
  <div
    className='position-absolute m-auto text-center'
    style={{ top: '50%', left: '50%', transform: 'translate(-50%)' }}
  >
    <Spinner animation='grow' style={{ width: '3em', height: '3em' }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  </div>
);
