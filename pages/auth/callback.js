import { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import mapDispatch from '../../util/redux';
import { login } from '../../data/auth/actions';
import { pageWithoutLayout } from '../../hocs/page';

class LoginCallback extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    signInUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (this.props.auth.loggedIn) {
      window.location.replace('/');
    } else {
      this.props.login(this.props.createUser, this.props.signInUser);
    }
  }

  render() {
    return <FormattedMessage id="AuthCallback.welcomeBack" />;
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

const mapDispatchToLogin = mapDispatch('login', login);

const WithMutations = compose(
  graphql(signInUserMutation, { name: 'signInUser' }),
  graphql(createUserMutation, { name: 'createUser' }),
  connect(null, mapDispatchToLogin),
)(LoginCallback);

export default pageWithoutLayout(WithMutations);
