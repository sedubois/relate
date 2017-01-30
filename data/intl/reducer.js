import { SET_LOCALE } from './actions';

export default initialLocale => (state = { locale: initialLocale }, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return { locale: action.locale };
    default:
      return state;
  }
};
