import { SET_LOCALE } from './actions';

export default browserLocale => (state = { locale: browserLocale }, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return { locale: action.locale };
    default:
      return state;
  }
};
