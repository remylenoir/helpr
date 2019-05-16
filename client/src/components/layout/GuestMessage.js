import React from 'react';
import { Link } from 'react-router-dom';

const GuestMessage = () => {
  return (
    <div>
      <h2>You must be logged in to use this feature</h2>
      <br />
      <p className='text-center'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <br />
      <p className='text-center'>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
};

export default GuestMessage;
