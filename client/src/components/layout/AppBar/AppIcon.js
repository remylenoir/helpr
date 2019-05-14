import React, { Fragment } from 'react';
import OurFontAwesome from '../OurFontAwesome';
import { Link } from 'react-router-dom';

const AppIcon = ({ icon, title, url }) => {
  return (
    <Fragment>
      <Link to={url}>
        <div className='text-white text-center'>
          <div className='icon'>
            <OurFontAwesome icon={icon} />
          </div>
          <h6 className='m-0'>{title}</h6>
        </div>
      </Link>
    </Fragment>
  );
};

export default AppIcon;
