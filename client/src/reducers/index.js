import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import alerts from './alerts';
import events from './events'

export default combineReducers({
  alert,
  auth,
  profile,
  alerts,
  events
});
