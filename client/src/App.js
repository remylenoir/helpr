import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
