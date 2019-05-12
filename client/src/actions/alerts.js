import axios from 'axios';
import { GET_ALERT } from './types';

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
