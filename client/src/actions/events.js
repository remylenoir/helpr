import axios from 'axios';
import { GET_EVENT, EDIT_EVENT, CLEAR_EVENT, DELETE_EVENT } from './types';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export const getEvent_ACTION = eventId => async dispatch => {
  const response = await service.get(`/events/${eventId}`);

  dispatch({
    type: GET_EVENT,
    payload: response.data
  });
};

export const editEvent_ACTION = (eventId, body) => async dispatch => {
  try {
    const response = await service.put(`/events/${eventId}`, body, {
      new: true
    });

    dispatch({
      type: EDIT_EVENT,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearEvent_ACTION = () => dispatch => {
  dispatch({ type: CLEAR_EVENT });
};

export const deleteEvent_ACTION = eventId => async dispatch => {
  try {
    await service.delete(`/events/${eventId}`);

    dispatch({
      type: DELETE_EVENT
    });
  } catch (error) {}
};
