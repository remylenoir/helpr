import React, { Fragment } from 'react';
import moment from 'moment';

// Bootstrap components
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Hero = ({ type, title, msg, date, creator, button, btnMsg, url }) => {
  return (
    <Fragment>
      {type && type === 'details' && (
        <div className={`hero ${type && 'details'}`}>
          <div className='container wrapper text-center'>
            <h1>{title}</h1>
            <h4>{msg}</h4>
            <p>
              Created by {creator && creator.username} <br /> {moment(date).fromNow()}
            </p>
            {button && <Button variant='primary'>{btnMsg}</Button>}
          </div>
          <div className='overlay'> </div>
          {url && <Image src={url} />}
        </div>
      )}

      {type && type === 'home' && (
        <div className={'hero'}>
          <div className='wrapper'>
            <h1>{title}</h1>
            <p>{msg}</p>
            {button && <Button variant='primary'>{btnMsg}</Button>}
          </div>
          <div className='overlay'> </div>
          {url && <Image src={url} />}
        </div>
      )}
    </Fragment>
  );
};

export default Hero;
