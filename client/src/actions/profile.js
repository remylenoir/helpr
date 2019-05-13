import service from '../utils/service';
import { GET_PROFILE, EDIT_PROFILE } from './types';

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
