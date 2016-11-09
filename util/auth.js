const AUTH_SECRET = 'auth-secret';
const USER_TOKEN = 'user-token';

export function storeSecret(secret) {
  window.sessionStorage.setItem(AUTH_SECRET, secret);
}

function getSecret() {
  return window.sessionStorage.getItem(AUTH_SECRET);
}

export function popSecret() {
  const secret = getSecret();
  window.sessionStorage.removeItem(AUTH_SECRET);
  return secret;
}

export function storeToken(token) {
  window.localStorage.setItem(USER_TOKEN, token);
}

export function getToken() {
  return window.localStorage.getItem(USER_TOKEN);
}

// TODO check in backend that token is still valid (e.g user may have been deleted)
export function loggedIn() {
  return !!getToken();
}

export function loggedOut() {
  return !getSecret() && !loggedIn();
}

export function clearStorage() {
  window.localStorage.clear();
  window.sessionStorage.clear();
}
