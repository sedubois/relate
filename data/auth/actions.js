import execXhr from '../../util/xhr';

export const LOGIN = 'SESSION/LOGIN';
export const LOGOUT = 'SESSION/LOGOUT';

export async function login(token) {
  // update server-side
  await execXhr({
    url: '/api/session',
    payload: { token },
  });

  // update client-side
  return {
    type: LOGIN,
    token,
  };
}

export async function logout() {
  // update server-side
  await execXhr({ url: '/api/auth/logout' });

  // update client-side
  return {
    type: LOGOUT,
  };
}
