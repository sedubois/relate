import React from 'react';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import config from '../../config';
import { popSecret, storeToken } from '../../util/auth';
import { resetStore } from '../../data/client';
import apollo from '../../hocs/apollo';
import page from '../../hocs/page';

function onAuthenticated(lock) {
  return new Promise(resolve => lock.on('authenticated', resolve));
}

function getProfile(lock, authToken) {
  return new Promise((resolve, reject) => {
    lock.getProfile(authToken, (error, profile) => (error ? reject(error) : resolve(profile)));
  });
}

function checkSecret(actual) {
  if (actual !== popSecret()) {
    throw new Error('Unexpected auth secret');
  }
}

const loginCallback = async () => {
  const Auth0Lock = require('auth0-lock').default; // eslint-disable-line global-require
  const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN);
  const { idToken: authToken, state } = await onAuthenticated(lock);
  const { secret, nextPathname } = JSON.parse(state);
  checkSecret(secret);
  return { lock, authToken, nextPathname };
};

// TODO create slug server-side to ensure it is available
function createSlug({ givenName, familyName }) {
  return `${givenName.substring(0, 1)}${familyName}`.substring(0, 8).toLowerCase();
}

function createUserDataFromProfile(profile) {
  const user = {
    givenName: profile.given_name,
    familyName: profile.family_name,
    picture: profile.picture,
  };
  user.slug = createSlug(user);
  return user;
}

class LoginCallback extends React.Component {
  static propTypes = {
    createUser: React.PropTypes.func.isRequired,
    signInUser: React.PropTypes.func.isRequired,
    url: React.PropTypes.shape({
      replaceTo: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const { lock, authToken, nextPathname } = await loginCallback();
    const profile = await getProfile(lock, authToken);
    const userToken = await this.createUserIfNeededAndSignIn(authToken, profile);
    storeToken(userToken);
    resetStore();
    this.props.url.replaceTo(nextPathname);
  }

  async createUserIfNeeded(authToken, profile) {
    try {
      await this.props.createUser({
        variables: {
          authToken,
          ...createUserDataFromProfile(profile),
        },
      });
    } catch (e) {
      // 3023 means user was already created, so let's ignore this error
      // see https://github.com/graphcool/dashboard/issues/294
      if (!e.graphQLErrors || e.graphQLErrors[0].code !== 3023) {
        throw e;
      }
    }
  }

  async signInUser(authToken) {
    const signInUserResponse = await this.props.signInUser({
      variables: {
        authToken,
      },
    });
    return signInUserResponse.data.signinUser.token;
  }

  async createUserIfNeededAndSignIn(authToken, profile) {
    await this.createUserIfNeeded(authToken, profile);
    return await this.signInUser(authToken);
  }

  render() {
    return <span>Welcome back, one moment please...</span>;
  }
}

const createUserMutation = gql`
  mutation createUser(
    $authToken: String!
    $givenName: String!
    $familyName: String!
    $slug: String!
    $picture: String!
  ) {
    createUser(
      authProvider: {
        auth0: {
          idToken: $authToken
        }
      }
      givenName: $givenName
      familyName: $familyName
      slug: $slug
      picture: $picture
    ) {
      auth0UserId
    }
  }
`;

const signInUserMutation = gql`
  mutation signInUser($authToken: String!) {
    signinUser(
      auth0: {
        idToken: $authToken
      }
    ) {
      token
    }
  }
`;

const WithMutations = compose(
  apollo(signInUserMutation, { name: 'signInUser', ssr: false }),
  apollo(createUserMutation, { name: 'createUser', ssr: false }),
)(LoginCallback);

export default page(WithMutations);
