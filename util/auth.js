import execXhr from './xhr';

const AUTH_SECRET = 'auth-secret';
const USER_TOKEN = 'user-token';
const NO_VALUE = 'NO_VALUE';

export function storeSecret(secret) {
  window.sessionStorage.setItem(AUTH_SECRET, secret);
}

function getSecret() {
  return window.sessionStorage.getItem(AUTH_SECRET);
}

export function removeSecret() {
  window.sessionStorage.removeItem(AUTH_SECRET);
}

export function popSecret() {
  const secret = getSecret();
  removeSecret();
  return secret;
}

function getLocalStorage(key) {
  const value = window.localStorage.getItem(key);
  if (value === NO_VALUE) {
    return undefined;
  }
  return value;
}

function setLocalStorage(key, value) {
  window.localStorage.setItem(key, value || NO_VALUE);
}

export function storeTokenLocally(userToken) {
  setLocalStorage(USER_TOKEN, userToken);
}

export async function storeToken(userToken) {
  // store token server-side
  await execXhr({ url: `/api/auth/login/${userToken}` });

  // store token client-side
  storeTokenLocally(userToken);
}

export async function clearToken() {
  // clear token server-side
  await execXhr({ url: '/api/auth/logout' });

  // clear token client-side
  setLocalStorage(USER_TOKEN, NO_VALUE);
}

export async function getToken(ctx = {}) {
  // server-side: get token from HTTP session
  if (!process.browser) {
    return ctx.req.session.userToken;
  }

  // client-side: get token from localStorage
  const localToken = getLocalStorage(USER_TOKEN);
  if (localToken !== null) {
    return localToken;
  }

  // We are client-side and there's no token in localStorage. Possible reasons:
  // - user is not logged in, or
  // - user cleared localStorage, or
  // - localStorage is disabled.
  // --> ask token from server (if there's one), then try to store it again.
  const userToken = (await execXhr({ url: '/api/auth' })).userToken;
  setLocalStorage(USER_TOKEN, userToken);
  return userToken;
}
