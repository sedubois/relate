import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import page from '../../hocs/page';
import { logout } from '../../data/auth/actions';

const mapDispatchToProps = dispatch => ({
  logout: async () => dispatch(await logout()),
});

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

export default page(connect(null, mapDispatchToProps)(Logout));
