import React from 'react';
import moment from 'moment';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Hero = ({ title, details, msg, date, creator, button, btnMsg, url, type }) => {
  switch (type) {
    case 'alert':
      return (
        <div className={`hero ${details && 'details'}`}>
          <div className='container wrapper text-center'>
            <h1>{title}</h1>
            <h4>{msg}</h4>
            <p>
              Created by {creator.username} <br /> {moment(date).format('DD/MM/YYYY')}
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
