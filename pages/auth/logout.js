import { Component, PropTypes } from 'react';
import pageWithData from '../../hocs/page';
import { clearToken } from '../../util/auth';

class Logout extends Component {
  static propTypes = {
    url: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  async componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.url.replace('/');
    } else {
      await clearToken();
      // TODO do client-side route transition instead, but must refresh Apollo state properly
      window.location.replace('/');
    }
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default pageWithData(Logout);
