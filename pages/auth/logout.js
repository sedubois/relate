import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { pageWithoutLayout } from '../../hocs/page';
import { logout } from '../../data/auth/actions';
import asyncAction from '../../util/redux';

const mapDispatchToLogout = dispatch => ({ logout: asyncAction(dispatch, logout) });

class Logout extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    if (this.props.auth.loggedIn) {
      await this.props.logout();
      window.location.replace('/');
    } else {
      Router.push('/');
    }
  }

  render() {
    if (this.props.auth.loggedIn) {
      return <div>Logging out...</div>;
    }
    return <div>Already logged out, redirecting home...</div>;
  }
}

export default pageWithoutLayout(connect(null, mapDispatchToLogout)(Logout));
