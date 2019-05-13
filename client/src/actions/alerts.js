import axios from 'axios';
import { GET_ALERT, EDIT_ALERT, DELETE_ALERT } from './types';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export const getAlert_ACTION = alertId => async dispatch => {
  const response = await service.get(`/alerts/${alertId}`);

  dispatch({
    type: GET_ALERT,
    payload: response.data
  });
};

export const editAlert_ACTION = (alertId, body) => async dispatch => {
  try {
    const response = await service.put(`/alerts/${alertId}`, body, {
      new: true
    });

    dispatch({
      type: EDIT_ALERT,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAlert_ACTION = alertId => async dispatch => {
  try {
    await service.delete(`/alerts/${alertId}`);

    dispatch({
      type: DELETE_ALERT
    });
  } catch (error) {}
};
