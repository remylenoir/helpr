import service from '../utils/service';
import {
  GET_PROFILE,
  EDIT_PROFILE,
  CHECK_BOOKMARK,
  ADD_BOOKMARK_ALERT,
  REMOVE_BOOKMARK_ALERT,
  ADD_BOOKMARK_EVENT,
  REMOVE_BOOKMARK_EVENT,
  UPLOAD_PROFILE_PICTURE
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

// Upload current user profile picure
export const uploadCurrentProfilePicture_ACTION = data => async dispatch => {
  const response = await service.post(`/users/upload`, data);

  dispatch({
    type: UPLOAD_PROFILE_PICTURE,
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
};
