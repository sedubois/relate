import React from 'react';
import css from 'next/css';
import uuid from 'uuid';
import config from '../../config';
import { BASE_URL } from '../../util/website';
import { getToken, storeSecret, removeSecret } from '../../util/auth.js';
import page from '../../hocs/page';

const LOCK_CONTAINER_ID = 'lock-container';

function createLock(nextPathname) {
  const secret = uuid.v4();
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

export class Login extends React.Component {
  static propTypes = {
    url: React.PropTypes.shape({
      replaceTo: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (getToken()) {
      this.props.url.replaceTo('/');
    } else {
      createAndShow('/');
    }
  }

  componentWillUnmount() {
    removeSecret();
  }

  render() {
    return <div id={LOCK_CONTAINER_ID} className={css({ margin: '2em 0 0' })} />;
  }
}

export default page(Login);