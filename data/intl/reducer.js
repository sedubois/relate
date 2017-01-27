import { SET_LOCALE } from './actions';

const initialState = {
  locale: 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return { locale: action.locale };
    default:
      return state;
  }
};
