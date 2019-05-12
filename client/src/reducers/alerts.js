import { GET_ALERT, EDIT_ALERT, DELETE_ALERT } from '../actions/types';

const initialState = {
  alert: null,
  location: null,
  edit: false,
  loading: true,
  delete: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALERT:
      return {
        ...state,
        alert: payload,
        location: payload.location.coordinates,
        edit: false,
        loading: false
      };
    case EDIT_ALERT:
      return {
        ...state,
        alert: payload,
        location: payload.location.coordinates,
        edit: true,
        loading: false
      };
    case DELETE_ALERT:
      return {
        ...state,
        alert: null,
        location: null,
        edit: false,
        loading: false,
        delete: true,
      };
    default:
      return state;
  }
}
