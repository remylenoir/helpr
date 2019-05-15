import React, {Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {setAlert_ACTION} from '../../actions/alert'

const PrivateRoute = ({
  setAlert_ACTION,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest,
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Fragment>
         <Redirect to='/' />
          {setAlert_ACTION('Must be logged in order to access')}
        </Fragment>
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {setAlert_ACTION})(PrivateRoute);
