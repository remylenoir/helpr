import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Map from '../map/Map';

const AlertWithMap = ({ sectionTitle, btnText, desc }) => {
  return (
    <Fragment>
      <div className='alert-with-map'>
        <Row>
          <Map navControl />
        </Row>
        <h3>{sectionTitle}</h3>
        <p>{desc}</p>
        <Button>{btnText}</Button>
      </div>
    </Fragment>
  );
};

export default AlertWithMap;
