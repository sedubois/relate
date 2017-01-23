import { Component } from 'react';
import pageWithData from '../../hocs/page';
import { clearToken } from '../../util/auth';

class Logout extends Component {
  async componentDidMount() {
    await clearToken();
    // TODO do client-side route transition instead, but must refresh Apollo state properly
    window.location.replace('/');
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default pageWithData(Logout);
