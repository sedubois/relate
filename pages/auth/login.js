import React from 'react';
import css from 'next/css';
import config from '../../config';
import { BASE_URL } from '../../util/website';
import { storeSecret, clearStorage } from '../../util/auth.js';
import page from '../../hocs/page';

const LOCK_CONTAINER_ID = 'lock-container';

function createNonce() {
  let text = '';
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < randomLength(); i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

function randomLength() {
  const minLength = 30;
  const maxLength = 50;
  return Math.floor((Math.random() * maxLength) + minLength);
}

function createLock(nextPathname) {
  const secret = createNonce();
  storeSecret(secret);
  const Auth0Lock = require('auth0-lock').default; // eslint-disable-line global-require
  return new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
    auth: {
      redirectUrl: `${BASE_URL}/auth/callback`,
      responseType: 'token',
      params: {
        state: JSON.stringify({
          secret,
          nextPathname,
        }),
      },
    },
    container: LOCK_CONTAINER_ID,
    // other options see https://auth0.com/docs/libraries/lock/v10/customization
  });
}

function createAndShow(nextPathname) {
  const lock = createLock(nextPathname);
  lock.show();
}

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  };

  componentDidMount() {
    createAndShow('/');
  }

  componentWillUnmount() {
    clearStorage();
  }

  render() {
    return <div id={LOCK_CONTAINER_ID} className={css({ margin: '2em 0 0' })} />;
  }
}

export default page(Login);
