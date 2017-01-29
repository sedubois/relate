const AUTH_SECRET = 'auth-secret';

export function storeSecret(secret) {
  window.sessionStorage.setItem(AUTH_SECRET, secret);
}

function getSecret() {
  return window.sessionStorage.getItem(AUTH_SECRET);
}

export function removeSecret() {
  window.sessionStorage.removeItem(AUTH_SECRET);
}

function popSecret() {
  const secret = getSecret();
  removeSecret();
  return secret;
}

export function checkSecret(actual) {
  if (actual !== popSecret()) {
    throw new Error('Unexpected auth secret');
  }
}
