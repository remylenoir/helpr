import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// App components
import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import NavBar from './components/layout/NavBar';
import AppBar from './components/layout/AppBar/AppBar';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Container fluid>
        <Row className='main-navigation'>
          <NavBar />
        </Row>

        <Row className='alert-container'>
          <Alert />
        </Row>

        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>

        <Row className='app-bar'>
          <AppBar />
        </Row>
      </Container>
    </Router>
  </Provider>
);

export default App;
