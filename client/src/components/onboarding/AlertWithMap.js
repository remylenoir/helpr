import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Map from '../map/Map';
import { Link } from 'react-router-dom';

const AlertWithMap = ({ sectionTitle, btnText, desc, btnLink }) => {
  return (
    <Fragment>
      <div className='alert-with-map'>
        <Row>
          <Map navControl={false} height={320} width={window.innerWidth} />
        </Row>
        <div className='info'>
          <h5>{sectionTitle}</h5>
          <p>{desc}</p>
          <Link to={btnLink}>
            <Button>{btnText}</Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default AlertWithMap;
