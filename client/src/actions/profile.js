import service from '../utils/service';
import {
  GET_PROFILE,
  EDIT_PROFILE,
  CHECK_BOOKMARK,
  ADD_BOOKMARK_ALERT,
  REMOVE_BOOKMARK_ALERT,
  ADD_BOOKMARK_EVENT,
  REMOVE_BOOKMARK_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT
} from './types';

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

export const checkBookmark_ACTION = alertId => dispatch => {
  dispatch({
    type: CHECK_BOOKMARK,
    payload: alertId
  });
};

export const addBookmarkAlert_ACTION = (alertId, userId) => async dispatch => {
  try {
    const response = await service.put(`/alerts/add/bookmark/${alertId}`);

    dispatch({
      type: ADD_BOOKMARK_ALERT,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeBookmarkAlert_ACTION = (
  alertId,
  userId
) => async dispatch => {
  try {
    await service.put(`/alerts/remove/bookmark/${alertId}`);

    dispatch({
      type: REMOVE_BOOKMARK_ALERT
    });
  } catch (error) {
    console.error(error);
  }
};

export const addBookmarkEvent_ACTION = (eventId, userId) => async dispatch => {
  try {
    const response = await service.put(`/events/add/bookmark/${eventId}`);

    dispatch({
      type: ADD_BOOKMARK_EVENT,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeBookmarkEvent_ACTION = (
  eventId,
  userId
) => async dispatch => {
  try {
    await service.put(`/events/remove/bookmark/${eventId}`);

    dispatch({
      type: REMOVE_BOOKMARK_EVENT
    });
  } catch (error) {
    console.error(error);
  }
};

export const joinEvent_ACTION = eventId => async dispatch => {
  try {
    const response = await service.put(`/events/join/${eventId}`);

    dispatch({
      type: JOIN_EVENT,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const leaveEvent_ACTION = eventId => async dispatch => {
  try {
    await service.put(`/events/leave/${eventId}`);

    dispatch({
      type: LEAVE_EVENT,
    });
  } catch (error) {
    console.error(error);
  }
};
