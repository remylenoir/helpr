import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Hero = props => {
  return (
    <div className={`hero ${props.class}`}>
      <div className='wrapper'>
        <h1>{props.title}</h1>
        <p>{props.msg}</p>
        {props.button && <Button variant='primary'>{props.btnMsg}</Button>}
      </div>
      <div className='overlay'> </div>
      <Image src={props.url} />
    </div>
  );
};

export default Hero;
