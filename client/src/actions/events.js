import service from '../utils/service';
import { GET_EVENT, EDIT_EVENT, CLEAR_EVENT, DELETE_EVENT, GET_ALL_EVENTS, CREATE_EVENT } from './types';

export const createEvent_ACTION = (body, userId) => async dispatch => {
  try {
    const response = await service.post('/events/add', body, userId);

    dispatch({
      type: CREATE_EVENT,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllEvents_ACTION = () => async dispatch => {
  const response = await service.get(`/events/all`);
  dispatch({
    type: GET_ALL_EVENTS,
    payload: response.data
  });
};

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
