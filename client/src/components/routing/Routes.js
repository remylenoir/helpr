import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from './PrivateRoute';
import AlertDetails from '../alerts/AlertDetails'

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/alert/:alertId' component={AlertDetails} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Routes;
