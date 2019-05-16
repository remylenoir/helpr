import React, { Fragment } from 'react';

// App components
import OurFontAwesome from '../OurFontAwesome';

const Subtitle = ({ icon, title }) => {
  return (
    <Fragment>
      <h2 className={'layout__subtitle'}>
        {icon && <OurFontAwesome icon={icon} />} {title}
      </h2>
      <hr />
    </Fragment>
  );
};

export default Subtitle;
