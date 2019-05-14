import {
  GET_PROFILE,
  EDIT_PROFILE,
  CHECK_BOOKMARK,
  ADD_BOOKMARK_ALERT,
  REMOVE_BOOKMARK_ALERT
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  edit: false,
  alertBookmarked: null
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
    case CHECK_BOOKMARK:
      return {
        ...state,
        // alertBookmarked: state.profile.favAlerts.some(alert => alert._id === payload),
        loading: false
      };
    default:
      return state;
  }
}
