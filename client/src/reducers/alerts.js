import { GET_ALERT } from '../actions/types';

const initialState = {
  alert: null,
  location: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_ALERT:
    return {
      ...state,
      alert: payload,
      location: payload.location.coordinates,
      loading: false,
    }
    default:
    return state;
  }
}
