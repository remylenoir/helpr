import React from 'react';
import moment from 'moment';

// Bootstrap components
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Hero = ({ title, details, msg, date, creator, button, btnMsg, url, type }) => {
  switch (type) {
    case 'alert':
      return (
        <div className={`hero ${details && 'details'}`}>
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
      );
    default: {
      return (
        <div className={'hero'}>
          <div className='wrapper'>
            <h1>{title}</h1>
            <p>{msg}</p>
            {button && <Button variant='primary'>{btnMsg}</Button>}
          </div>
          <div className='overlay'> </div>
          {url && <Image src={url} />}
        </div>
      );
    }
  }
};

export default Hero;
