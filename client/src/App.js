import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import NavBar from './components/layout/NavBar';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const App = () => (
  <Provider store={store}>
    <Router>
      <Container fluid>
        <Row>
          <NavBar />
        </Row>
        <Row>
          <Alert />
        </Row>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Container>
    </Router>
  </Provider>
);

export default App;
