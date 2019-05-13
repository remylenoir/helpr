import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function HorizontalScroll({ title, btnText }) {
  return (
    <Fragment>
      <div className='horizontal-scroll'>
        <h3>{title}</h3>
        <div className='horizontal-scroll-wrapper'>
          {/* Duplicated Card component for testing, needs to pass props to Card and map through them */}
          <Card style={{ width: '15rem' }}>
            <Card.Img variant='top' src='https://source.unsplash.com/random/300x200?helping' />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '15rem' }}>
            <Card.Img variant='top' src='https://source.unsplash.com/random/300x200?helping' />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '15rem' }}>
            <Card.Img variant='top' src='https://source.unsplash.com/random/300x200?helping' />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Button variant='outline-primary'>{btnText}</Button>
      </div>
    </Fragment>
  );
}

HorizontalScroll.propTypes = {
  title: PropTypes.string,
  btnText: PropTypes.string
};

export default HorizontalScroll;
