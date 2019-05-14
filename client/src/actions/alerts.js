import service from '../utils/service';
import {
  GET_ALERT,
  EDIT_ALERT,
  DELETE_ALERT,
  GET_ALL_ALERTS,
  CREATE_ALERT,
  BOOKMARK_ALERT
} from './types';

export const createAlert_ACTION = (body, userId) => async dispatch => {
  const response = await service.post('/alerts/add', body, userId);

  dispatch({
    type: CREATE_ALERT,
    payload: response.data
  });
};

export const getAllAlerts_ACTION = () => async dispatch => {
  const response = await service.get(`/alerts/all`);

  dispatch({
    type: GET_ALL_ALERTS,
    payload: response.data
  });
};

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

export const bookmarkAlert_ACTION = (alertId, userId) => async dispatch => {
  try {
    await service.put(`/alerts/bookmark/${alertId}`);
  
    dispatch({
      type: BOOKMARK_ALERT
    });
  } catch (error) {
    console.log(error)
  }
};
