import { Component, PropTypes } from 'react';
import Router from 'next/router';
import pageWithData from '../../hocs/page';
import { clearToken } from '../../util/auth';

class Logout extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  async componentDidMount() {
    if (this.props.loggedIn) {
      await clearToken();
      window.location.replace('/');
    } else {
      Router.push('/');
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <div>Logging out...</div>;
    }
    return <div>Already logged out, redirecting home...</div>;
  }
}

export default pageWithData(Logout);
