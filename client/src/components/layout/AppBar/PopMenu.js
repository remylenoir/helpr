import React, { Fragment } from 'react';
import PlusItem from './PlusItem';

const CreateIcon = () => {
  window.addEventListener('mousedown', function(event) {
    const popLabel = document.querySelector('#trigger-close');
    if (event.target !== popLabel) document.querySelector('#triggerButton').checked = false;
  });

  const handleClick = () => {
    document.querySelector('#trigger-close').checked = !document.querySelector('#triggerButton').checked;
  };

  return (
    <Fragment>
      <div className='position-relative create-container'>
        <input id='triggerButton' className='triggerButton d-none' type='checkbox' />
        <label htmlFor='triggerButton' id='trigger-close' onClick={handleClick} />
        <PlusItem title={'Alert'} icon={'fa-exclamation'} url={'/create/alert'} position={'one'} />
        <PlusItem title={'Event'} icon={'fa-calendar-alt'} url={'/create/event'} position={'two'} />
      </div>
    </Fragment>
  );
};

export default CreateIcon;
