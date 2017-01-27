import { combineReducers } from 'redux';
import intl from './intl/reducer';

export default function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
    intl,
  });
}
