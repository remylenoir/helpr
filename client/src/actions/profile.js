import axios from 'axios';
import { setAlert_ACTION } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Get current users profile
export const getCurrentProfile_ACTION = userId => async dispatch => {
  try {
    const response = await service.get(`/users/${userId}`);
    
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    const err = error.response.data.message;

    dispatch(setAlert_ACTION(err));

    dispatch({
      type: PROFILE_ERROR
    });
  }
};
