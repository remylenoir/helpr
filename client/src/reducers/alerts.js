import { GET_ALERT, EDIT_ALERT, DELETE_ALERT, GET_ALL_ALERTS } from '../actions/types';

const initialState = {
  alerts: null,
  alert: null,
  location: null,
  edit: false,
  loading: true,
  isDeleted: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ALERTS:
    return {
      ...state,
      alerts: payload,
      location: null,
      edit: false,
      loading: false,
      isDeleted: false,
    }
    case GET_ALERT:
      return {
        ...state,
        alert: payload,
        location: payload.location.coordinates,
        edit: false,
        loading: false,
        isDeleted: false,
      };
    case EDIT_ALERT:
      return {
        ...state,
        alert: payload,
        location: payload.location.coordinates,
        edit: true,
        loading: false,
        isDeleted: false,
      };
    case DELETE_ALERT:
      return {
        ...state,
        alert: null,
        location: null,
        edit: false,
        loading: false,
        isDeleted: true,
      };
    default:
      return state;
  }
}
