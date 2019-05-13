import React, { Fragment } from 'react';

const OurFontAwesome = ({ icon }) => {
  return (
    <Fragment>
      <i className={`fas ${icon}`} />
    </Fragment>
  );
};
export default OurFontAwesome;
