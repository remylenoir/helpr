import React, { Component } from 'react';

import moment from 'moment';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';

// Bootstrap components
import Form from 'react-bootstrap/Form';

class DatePicker extends Component {
  state = {
    m: moment()
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    return (
      <div>
        <Form.Control type='text' name='title' value={this.state.m.format('llll')} readOnly />
        <InputMoment
          moment={this.state.m}
          onChange={this.handleChange}
          minStep={5}
          onSave={this.handleSave}
        />
      </div>
    );
  }
}

export default DatePicker;
