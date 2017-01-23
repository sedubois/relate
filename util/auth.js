import execXhr from './xhr';

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

export async function storeToken(userToken) {
  // store token server-side
  await execXhr({ url: `/api/auth/login/${userToken}` });

  // store token client-side
  window.localStorage.setItem(USER_TOKEN, userToken);
}

export async function clearToken() {
  // clear token server-side
  await execXhr({ url: '/api/auth/logout' });

  // clear token client-side
  window.localStorage.removeItem(USER_TOKEN);
}

export async function getToken(ctx = {}) {
  // server-side: get token from HTTP session
  if (ctx.req) {
    return ctx.req.session.userToken;
  }

  // client-side: get token from localStorage
  const localToken = window.localStorage.getItem(USER_TOKEN);
  if (localToken) {
    return localToken;
  }

  // We are client-side and there's no token in localStorage. Possible reasons:
  // - user is not logged in, or
  // - user cleared localStorage, or
  // - localStorage is disabled.
  // --> ask token from server (if there's one), then try to store it again.
  const userToken = (await execXhr({ url: '/api/auth' })).userToken;
  if (userToken) {
    window.localStorage.setItem(USER_TOKEN, userToken);
  }
  return userToken;
}
