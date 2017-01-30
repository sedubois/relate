import { combineReducers } from 'redux';
import intl from './intl/reducer';
import session from './session/reducer';

export default function getReducer(client, { browserLocale }) {
  return combineReducers({
    apollo: client.reducer(),
    intl: intl(browserLocale),
    session,
  });
}
