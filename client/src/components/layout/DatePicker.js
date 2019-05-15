import React, { useState, Component } from 'react';

import moment from 'moment';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';

// Bootstrap components
import Form from 'react-bootstrap/Form';

const DatePicker = () => {
  const [m, setM] = useState(moment());
  // state = {
  //   m: moment()
  // };

  const handleChange = m => {
    setM(m);
  };
  // handleChange = m => {
  //   this.setState({ m });
  // };

  const handleSave = () => {
    console.log('saved', m.format('llll'));
  };
  // handleSave = () => {
  //   console.log('saved', m.format('llll'));
  // };

  return (
    <div>
      <Form.Control
        type='text'
        name='title'
        value={m.format('llll')}
        readOnly
      />
      <InputMoment
        moment={m}
        onChange={handleChange}
        minStep={5}
        onSave={handleSave}
      />
    </div>
  );
};

export default DatePicker;
