import execXhr from '../../util/xhr';

export const UPDATE_SESSION = 'UPDATE_SESSION';
export const LOGOUT = 'LOGOUT';

export async function updateSession(sessionInfo) {
  // update server-side
  await execXhr({ url: `/api/auth/login/${sessionInfo.token}` });

  // update client-side
  return {
    type: UPDATE_SESSION,
    sessionInfo,
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
