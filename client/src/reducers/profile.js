import {
  GET_PROFILE,
  EDIT_PROFILE,
  CHECK_BOOKMARK,
  ADD_BOOKMARK_ALERT,
  REMOVE_BOOKMARK_ALERT,
  ADD_BOOKMARK_EVENT,
  REMOVE_BOOKMARK_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT,
  UPLOAD_PROFILE_PICTURE
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  edit: false,
  alertBookmarked: null,
  eventBookmarked: null,
  eventJoined: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        edit: false,
        alertBookmarked: null
      };
    case EDIT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        edit: true,
        alertBookmarked: null
      };
    case UPLOAD_PROFILE_PICTURE:
      return {
        ...state,
        profile: { ...state.profile, profilePicture: payload },
        loading: false,
        edit: true
      };

    case ADD_BOOKMARK_ALERT:
      return {
        ...state,
        alertBookmarked: payload,
        loading: false
      };
    case REMOVE_BOOKMARK_ALERT:
      return {
        ...state,
        alertBookmarked: null,
        loading: false
      };
    case ADD_BOOKMARK_EVENT:
      return {
        ...state,
        eventBookmarked: payload,
        loading: false
      };
    case REMOVE_BOOKMARK_EVENT:
      return {
        ...state,
        eventBookmarked: null,
        loading: false
      };
    case CHECK_BOOKMARK:
      return {
        ...state,
        // alertBookmarked: state.profile.favAlerts.some(alert => alert._id === payload),
        loading: false
      };
    case JOIN_EVENT:
      return {
        ...state,
        eventJoined: payload,
        loading: false
      };
    case LEAVE_EVENT:
      return {
        ...state,
        eventJoined: null,
        loading: false
      };
    default:
      return state;
  }
}
