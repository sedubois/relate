import { combineReducers } from 'redux';
import auth from './auth/reducer';

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    auth,
  });
}
