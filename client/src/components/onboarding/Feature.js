import React, { Fragment } from 'react';
import OurFontAwesome from '../layout/OurFontAwesome';

const Feature = ({ icon, title, desc }) => {
  return (
    <Fragment>
      <div className='feature'>
        <div className='img'>
          <OurFontAwesome icon={icon} />
        </div>
        <h6>{title}</h6>
        <p>{desc}</p>
      </div>
    </Fragment>
  );
};

export default Feature;
