import {
  GET_ALERT,
  EDIT_ALERT,
  DELETE_ALERT,
  GET_ALL_ALERTS,
  CREATE_ALERT,
  BOOKMARK_ALERT,
  UPLOAD_ALERT_IMG
} from '../actions/types';

const initialState = {
  alerts: null,
  alert: null,
  location: null,
  edit: false,
  loading: true,
  isCreated: false,
  isDeleted: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ALERT:
      return {
        ...state,
        alert: payload,
        edit: false,
        loading: false,
        isCreated: true,
        isDeleted: false
      };
    case GET_ALL_ALERTS:
      return {
        ...state,
        alerts: payload,
        alert: null,
        location: null,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: false
      };
    case GET_ALERT:
      return {
        ...state,
        alert: payload,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: false
      };
    case EDIT_ALERT:
      return {
        ...state,
        alert: payload,
        location: payload.location.coordinates,
        edit: true,
        loading: false,
        isCreated: false,
        isDeleted: false
      };
    case DELETE_ALERT:
      return {
        ...state,
        alert: null,
        location: null,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: true
      };
    case BOOKMARK_ALERT:
      return {
        ...state
      };
    case UPLOAD_ALERT_IMG:
      return {
        ...state,
        imageURL: payload,
        edit: false,
        loading: false
      };
    default:
      return state;
  }
}
