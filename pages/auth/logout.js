import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { pageWithoutLayout } from '../../hocs/page';
import { logout } from '../../data/auth/actions';
import mapDispatch from '../../util/redux';

const mapDispatchToLogout = mapDispatch('logout', logout);

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
      window.location.replace('/');
    }
  }

  render() {
    if (this.props.auth.loggedIn) {
      return <FormattedMessage id="AuthLogout.text" />;
    }
    return null;
  }
}

export default pageWithoutLayout(connect(null, mapDispatchToLogout)(Logout));
