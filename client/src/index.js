import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Bootstrap & SCSS imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/styles.scss';

//fontawesome icon
// import { library } from '@fortawesome/fontawesome-svg-core';
// import {
//   faCheckSquare,
//   faCoffee,
//   faPeopleCarry
// } from '@fortawesome/free-solid-svg-icons';
// library.add(faCheckSquare, faCoffee, faPeopleCarry);

ReactDOM.render(<App />, document.getElementById('root'));
