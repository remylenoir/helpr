import {
  GET_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENT,
  GET_ALL_EVENTS
} from '../actions/types';

const initialState = {
  events: null,
  event: null,
  date: null,
  location: null,
  edit: false,
  loading: true,
  isDeleted: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: payload,
        event: null,
        date: null,
        location: null,
        edit: false,
        loading: false,
        isDeleted: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        date: payload.date,
        location: payload.location.coordinates,
        edit: false,
        loading: false,
        isDeleted: false
      };
    case EDIT_EVENT:
      return {
        ...state,
        event: payload,
        date: payload.date,
        location: payload.location.coordinates,
        edit: true,
        loading: false,
        isDeleted: false
      };
    case CLEAR_EVENT:
      return {
        ...state,
        event: null,
        date: null,
        location: null,
        edit: false,
        loading: false,
        isDeleted: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        event: null,
        edit: false,
        loading: false,
        isDeleted: true
      };
    default:
      return state;
  }
}
