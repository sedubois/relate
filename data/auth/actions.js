import execXhr from '../../util/xhr';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config';
import { checkSecret } from '../../util/authSecret';

/* eslint-disable */
const Auth0Lock = process.browser && require('auth0-lock').default;
const lock = process.browser && new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
/* eslint-enable */

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

function onAuthenticated() {
  return new Promise(resolve => lock.on('authenticated', resolve));
}

async function getTokenAndState() {
  const { idToken: authToken, state: jsonState } = await onAuthenticated();
  const { secret, ...state } = JSON.parse(jsonState);
  checkSecret(secret);
  return {
    type: 'GET_TOKEN_AND_STATE',
    authToken,
    ...state,
  };
}

async function getProfile(authToken) {
  const profile = await new Promise((resolve, reject) => {
    lock.getProfile(authToken, (err, res) => (err ? reject(err) : resolve(res)));
  });
  return {
    type: 'GET_PROFILE',
    profile,
  };
}

// TODO create slug server-side to ensure it is available
function createSlug({ givenName, familyName }) {
  return `${givenName.substring(0, 1)}${familyName}`.substring(0, 8).toLowerCase();
}

function createUserDataFromProfile(profile) {
  const user = {
    givenName: profile.given_name,
    familyName: profile.family_name,
    picture: profile.picture,
  };
  user.slug = createSlug(user);
  return user;
}

async function createUserIfNeeded(createUserMutation, authToken, profile) {
  const variables = {
    authToken,
    ...createUserDataFromProfile(profile),
  };
  try {
    await createUserMutation({ variables });
  } catch (e) {
    // 3023 means user was already created, so let's ignore this error
    // see https://github.com/graphcool/dashboard/issues/294
    if (!e.graphQLErrors || e.graphQLErrors[0].code !== 3023) {
      throw e;
    }
  }
  return {
    type: 'CREATE_USER',
    variables,
  };
}

async function graphQlSignIn(signInMutation, authToken) {
  const variables = { authToken };
  const signInUserResponse = await signInMutation({ variables });
  return {
    type: 'GRAPHQL_LOGIN',
    variables,
    userToken: signInUserResponse.data.signinUser.token,
  };
}

async function sessionLogin(token) {
  // update server-side
  await execXhr({ url: `/api/auth/login/${token}` });

  // update client-side
  return {
    type: SESSION_LOGIN,
    token,
  };
}

export async function login(dispatch, createUserMutation, signInMutation) {
  const getTokenAndStateAction = await getTokenAndState();
  dispatch(getTokenAndStateAction);
  const { authToken, nextPathname } = getTokenAndStateAction;

  const getProfileAction = await getProfile(authToken);
  dispatch(getProfileAction);
  const { profile } = getProfileAction;

  const createUserAction = await createUserIfNeeded(createUserMutation, authToken, profile);
  dispatch(createUserAction);

  const graphQlLoginAction = await graphQlSignIn(signInMutation, authToken);
  dispatch(graphQlLoginAction);
  const { userToken } = graphQlLoginAction;

  const sessionLoginAction = await sessionLogin(userToken);
  dispatch(sessionLoginAction);

  window.location.replace(nextPathname);
}

export async function logout(dispatch) {
  // update server-side
  await execXhr({ url: '/api/auth/logout' });

  // update client-side
  dispatch({ type: SESSION_LOGOUT });
}
