import { GET_PROFILE, EDIT_PROFILE, CHECK_BOOKMARK, ADD_BOOKMARK_ALERT } from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  edit: false,
  alertBookmarked: null,
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
      };
    case EDIT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        edit: true
      };
    case ADD_BOOKMARK_ALERT:
      return {
        ...state,
        alertBookmarked: state.profile.favAlerts.some(alert => alert._id === payload),
        loading: false,
      }
      case CHECK_BOOKMARK:
        return {
          ...state,
          alertBookmarked: state.profile.favAlerts.some(alert => alert._id === payload),
          loading: false,
        }
    default:
      return state;
  }
}
