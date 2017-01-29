import { LOGOUT, UPDATE_SESSION } from './actions';

const initialState = {
  loggedIn: false,
  token: null,
};

export default (state = initialState, action) => {
  const newState = {};

  switch (action.type) {
    case UPDATE_SESSION:
      Object.assign(newState, state, action.sessionInfo);
      newState.loggedIn = Boolean(newState.token);
      return newState;

    case LOGOUT:
      return { token: null, loggedIn: false };

    default:
      return state;
  }
};
