import {
  GET_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENT,
  GET_ALL_EVENTS,
  CREATE_EVENT, ADD_COMMENT_EVENT,
  UPLOAD_EVENT_IMG,
  IMG_STATE_TRANSFER
} from '../actions/types';

const initialState = {
  events: null,
  event: null,
  date: null,
  location: null,
  edit: false,
  loading: true,
  isCreated: false,
  isDeleted: false,
  coverImage: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        event: payload,
        edit: false,
        loading: false,
        isCreated: true,
        isDeleted: false
      };
    case UPLOAD_EVENT_IMG:
      return {
        ...state,
        coverImage: payload,
        edit: false,
        loading: false
      };
    case IMG_STATE_TRANSFER:
    return {
      ...state,
      event: {
        ...state.event,
        coverImage: state.coverImage,
      }
    }
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: payload,
        event: null,
        loading: false,
        isCreated: false,
        isDeleted: false,
        coverImage: null,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        date: payload.date,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: false,
        coverImage: null,
      };
    case EDIT_EVENT:
      return {
        ...state,
        event: payload,
        date: payload.date,
        edit: true,
        loading: false,
        isCreated: false,
        isDeleted: false
      };
    case CLEAR_EVENT:
      return {
        ...state,
        date: null,
        location: null,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        event: null,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: true
      };
      case ADD_COMMENT_EVENT:
      return {
        ...state,
        event: payload,
        edit: false,
        loading: false,
        isCreated: false,
        isDeleted: false,
      }
    default:
      return state;
  }
}
