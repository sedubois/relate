const AUTH_SECRET = 'auth-secret';
const USER_TOKEN = 'user-token';

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

export function storeToken(token) {
  window.localStorage.setItem(USER_TOKEN, token);
}

export function getToken() {
  return typeof window !== 'undefined' ? window.localStorage.getItem(USER_TOKEN) : null;
}

// TODO check in backend that token is still valid (e.g user may have been deleted)
export function loggedIn() {
  return !!getToken();
}

export function loggedOut() {
  return !getSecret() && !loggedIn();
}
