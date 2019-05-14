import React, { Fragment } from 'react';
import PlusItem from './PlusItem';

const CreateIcon = () => {
  return (
    <Fragment>
      <div className='position-relative create-container'>
        <input id='triggerButton' className='triggerButton d-none' type='checkbox' />
        <label htmlFor='triggerButton' />
        <PlusItem title={'Alert'} icon={'fa-exclamation'} url={'/alerts/add'} position={'one'} />
        <PlusItem title={'Event'} icon={'fa-calendar-alt'} url={'/events/add'} position={'two'} />
      </div>
    </Fragment>
  );
};

export default CreateIcon;
