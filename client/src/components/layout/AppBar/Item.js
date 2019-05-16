import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// App components
import OurFontAwesome from '../OurFontAwesome';

const Item = ({ icon, title, url }) => {
  return (
    <Fragment>
      <Link to={url}>
        <div className='app-bar-text text-center'>
          <div className='icon'>
            <OurFontAwesome icon={icon} />
          </div>
          <span className='m-0'>{title}</span>
        </div>
      </Link>
    </Fragment>
  );
};

export default Item;
