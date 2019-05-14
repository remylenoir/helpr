import React, { Fragment } from 'react';
import OurFontAwesome from '../OurFontAwesome';
import { Link } from 'react-router-dom';

const PlusItem = ({ title, icon, url, position }) => {
  return (
    <Fragment>
      <Link to={url}>
        <div className={`${position} d-flex justify-content-center align-items-center`}>
          <div className='text-white text-center'>
            <OurFontAwesome icon={icon} />
            <h6>{title}</h6>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default PlusItem;
