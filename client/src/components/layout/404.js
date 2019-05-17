import React from 'react';

// App components

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const route404 = () => {
  return (
    <div className='auth-view d-flex align-items-center justify-content-center container'>
    <Row>
      <Container>
        <h3 className='text-center'>
          <br />
          Page not found <br />
          
        </h3>

      </Container>
    </Row>
  </div>
  )
}

export default route404
