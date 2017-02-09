import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { login } from '../data/auth/actions';
import mapDispatch from '../util/redux';

let auth = { loggedIn: false };

const mapDispatchToLogin = mapDispatch('login', login);

export default (ComposedComponent) => {
  class WithAuth extends Component {
    static propTypes = {
      serverRendered: PropTypes.bool.isRequired,
      auth: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      if (!process.browser) {
        auth = (ctx.req.session && ctx.req.session.user) || {};
        auth.loggedIn = Boolean(auth.token);
      }
      return {
        serverRendered: !process.browser,
        auth,
        ...await loadGetInitialProps(ComposedComponent, ctx),
      };
    }

    componentDidMount() {
      if (this.props.serverRendered) {
        auth = this.props.auth;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return connect(null, mapDispatchToLogin)(WithAuth);
};
