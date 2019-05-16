import React from 'react';
import { Link } from 'react-router-dom';

// App components
import OurFontAwesome from '../layout/OurFontAwesome';

const BackLink = ({ url, title }) => {
  return (
    <div className='mb-2'>
      <Link to={url} className='text-secondary'>
        <OurFontAwesome icon={'fa-arrow-left'} /> {title}
      </Link>
    </div>
  );
};

export default BackLink;
