import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
// import Map from '../map/Map';

const AlertWithMap = props => {
  return (
    <Fragment>
      <div className='alert-with-map'>
        {/* <Map /> */}
        <img src='https://source.unsplash.com/random/200x400?map' alt='' />
        <h3>Help the people in need</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          sapiente laboriosam possimus, quia exercitationem dicta molestias
          voluptatum ad hic modi nesciunt ipsum corporis impedit, vitae beatae
          ab. Neque, velit repellendus?
        </p>
        <Button>Get invovle now</Button>
      </div>
    </Fragment>
  );
};

AlertWithMap.propTypes = {};

export default AlertWithMap;
