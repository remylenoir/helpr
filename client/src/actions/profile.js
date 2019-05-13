import axios from 'axios';
import { GET_PROFILE, EDIT_PROFILE } from './types';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Get current user profile
export const getCurrentProfile_ACTION = userId => async dispatch => {
  const response = await service.get(`/users/${userId}`);

  dispatch({
    type: GET_PROFILE,
    payload: response.data
  });
};

// Edit current user profile
export const editCurrentProfile_ACTION = (userId, body) => async dispatch => {
  const response = await service.put(`/users/${userId}`, body, { new: true });

  dispatch({
    type: EDIT_PROFILE,
    payload: response.data
  });
};
