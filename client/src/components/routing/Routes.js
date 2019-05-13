import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Auth components
import Register from '../auth/Register';
import Login from '../auth/Login';

// Main components
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';

// Alert components
import AlertDetails from '../alerts/AlertDetails';
import AlertList from '../alerts/AlertList';

// Events components
import EventDetails from '../events/EventDetails';
import EventList from '../events/EventList';

// User components
import Profile from '../user/Profile';
import EditProfile from '../user/EditProfile';

// Bootstrap components
import Row from 'react-bootstrap/Row';

const Routes = () => {
  return (
    <Fragment>
      <Row>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/alert/all' component={AlertList} />
          <Route exact path='/alert/:alertId' component={AlertDetails} />
          <Route exact path='/event/all' component={EventList} />
          <Route exact path='/event/:eventId' component={EventDetails} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/profile/edit' component={EditProfile} />
        </Switch>
      </Row>
    </Fragment>
  );
};

export default Routes;
