import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

// App components
import OurFontAwesome from '../layout/OurFontAwesome';

// Bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const GuestMessage = () => {
  return (
    <div className='auth-view d-flex align-items-center justify-content-center container'>
      <Row>
        <Container>
          <FadeIn>
            <h3 className='text-center'>
              <OurFontAwesome icon={'fa-sign-in-alt'} />
              <br />
              You must be logged in <br />
              to use this feature
            </h3>

            <Link to='/login' className='btn btn-primary btn-block my-3'>
              Log in
            </Link>

            <hr />
            <p className='text-center'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </FadeIn>
        </Container>
      </Row>
    </div>
  );
};

export default GuestMessage;
