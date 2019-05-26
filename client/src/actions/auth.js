import service from '../utils/service';
import { setAlert_ACTION } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

//Register user
export const register_ACTION = ({ username, password }) => async dispatch => {
  const body = { username, password };

  try {
    const response = await service.post('/auth/signup', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    const err = error.response.data.message;
    dispatch(setAlert_ACTION(err, 'danger'));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login user
export const login_ACTION = ({ username, password }) => async dispatch => {
  const body = { username, password };

  try {
    const response = await service.post('/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert_ACTION('Invalid credentials', 'danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout user / clear profile
export const logout_ACTION = () => dispatch => {
  dispatch({ type: LOGOUT });
};
