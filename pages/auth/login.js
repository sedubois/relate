import { Component, PropTypes } from 'react';
import uuid from 'uuid';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../config';
import BASE_URL from '../../util/baseUrl';
import { storeSecret, removeSecret } from '../../util/authSecret';
import pageWithData from '../../hocs/page';

const LOCK_CONTAINER_ID = 'lock-container';

function createLock(nextPathname) {
  const secret = uuid.v4();
  storeSecret(secret);
  const Auth0Lock = require('auth0-lock').default; // eslint-disable-line global-require
  return new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
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

class Login extends Component {
  static propTypes = {
    url: PropTypes.object.isRequired,
    session: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    if (this.props.loggedIn) {
      this.props.url.replace('/');
    } else {
      createAndShow('/');
    }
  }

  componentWillUnmount() {
    removeSecret();
  }

  render() {
    return (
      <div id={LOCK_CONTAINER_ID}>
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
      </div>
    );
  }
}

export default pageWithData(Login);
