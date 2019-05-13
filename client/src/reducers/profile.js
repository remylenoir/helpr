import { GET_PROFILE, EDIT_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  edit: false
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
    default:
      return state;
  }
}
