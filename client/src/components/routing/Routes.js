import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Auth components
import Register from '../auth/Register';
import Login from '../auth/Login';

// Main components
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Search from '../layout/Search';
import Bookmarks from '../bookmarks/Bookmarks';
import Explore from '../explore/Explore';

// Alert components
import AlertDetails from '../alerts/AlertDetails';
import AlertList from '../alerts/AlertList';
import EditAlert from '../alerts/EditAlert';
import CreateAlert from '../alerts/CreateAlert';

// Events components
import EventDetails from '../events/EventDetails';
import EventList from '../events/EventList';
import EditEvent from '../events/EditEvent';
import CreateEvent from '../events/CreateEvent';

// User components
import Profile from '../user/Profile';
import EditProfile from '../user/EditProfile';

// Map view
import MapView from '../ mapview/MapView';

// Bootstrap components
import Row from 'react-bootstrap/Row';

const Routes = () => {
  return (
    <Fragment>
      <Row className='private-container h-100'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/alert/all' component={AlertList} />
          <Route exact path='/alert/:alertId' component={AlertDetails} />
          <Route exact path='/event/all' component={EventList} />
          <Route exact path='/event/:eventId' component={EventDetails} />
          <Route exact path='/map' component={MapView} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/bookmarks' component={Bookmarks} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/profile/edit' component={EditProfile} />
          <PrivateRoute exact path='/create/alert' component={CreateAlert} />
          <PrivateRoute exact path='/create/event' component={CreateEvent} />
          <PrivateRoute
            exact
            path='/alert/:alertId/edit'
            component={EditAlert}
          />
          <PrivateRoute
            exact
            path='/event/:eventId/edit'
            component={EditEvent}
          />
        </Switch>
      </Row>
    </Fragment>
  );
};

export default Routes;
