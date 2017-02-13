import { Component, PropTypes } from 'react';
import uuid from 'uuid';
import Auth0Lock from 'auth0-lock';
import BASE_URL from '../util/baseUrl';
import { storeSecret, removeSecret } from '../util/authSecret';

const LOCK_CONTAINER_ID = 'lock-container';

function showLock(nextPathname) {
  const secret = uuid.v4();
  storeSecret(secret);
  const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
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
  lock.show();
}

export default class Lock extends Component {
  static propTypes = {
    url: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const nextPathname = '/';
    if (this.props.loggedIn) {
      this.props.url.replace(nextPathname);
    } else {
      showLock(nextPathname);
    }
  }

  componentWillUnmount() {
    removeSecret();
  }

  render() {
    return (
      <span>
        <div id={LOCK_CONTAINER_ID} />
        <style jsx>{`
          #lock-container {
            margin: 2em 0 0;
          }
        `}</style>
        <style jsx global>{`
          .auth0-lock-header {
            display: none;
          }
        `}</style>
      </span>
    );
  }
}
