import { combineReducers } from 'redux';
import intl from './intl/reducer';
import auth from './auth/reducer';

export default function getReducer(client, { locale }) {
  return combineReducers({
    apollo: client.reducer(),
    intl: intl(locale),
    auth,
  });
}
