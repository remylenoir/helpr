import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// App components
import OurFontAwesome from '../OurFontAwesome';

const Item = ({ icon, title, url }) => {
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

export default Item;
