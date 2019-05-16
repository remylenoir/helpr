import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Bootstrap components
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Hero = ({
  type,
  dateformat,
  title,
  category,
  msg,
  date,
  creator,
  button,
  btnMsg,
  url,
  btnLink
}) => {
  return (
    <Fragment>
      {type && type === 'details' && (
        <div className={`hero ${type && 'details'}`}>
          <div className='container wrapper text-center'>
            <h1>{title}</h1>
            <p>{category}</p>
            <p>
              {creator && (
                <Fragment>
                  Created by {creator && creator.username} <br />
                </Fragment>
              )}
              {date &&
                dateformat &&
                dateformat === 'calendar' &&
                moment(date).format('MMMM Do, h:mm a')}
              {date &&
                dateformat &&
                dateformat === 'spent' &&
                moment(date).fromNow()}
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
            {button && (
              <Link to={btnLink}>
                <Button variant='primary'>{btnMsg}</Button>
              </Link>
            )}
          </div>
          <div className='overlay'> </div>
          {url && <Image src={url} />}
        </div>
      )}
    </Fragment>
  );
};

export default Hero;
