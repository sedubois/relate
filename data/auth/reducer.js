import { LOGIN, LOGOUT } from './actions';

const initialState = {
  loggedIn: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        loggedIn: Boolean(action.token),
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        loggedIn: false,
      };

    default:
      return state;
  }
};
