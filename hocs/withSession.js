import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { updateSession } from '../data/session/actions';

let session = { loggedIn: false };

const mapDispatchToProps = dispatch => ({
  updateSession: async (patch) => {
    dispatch(await updateSession(patch));
  },
});

export default (ComposedComponent) => {
  class WithSession extends Component {
    static propTypes = {
      serverRendered: PropTypes.bool.isRequired,
      session: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      if (!process.browser) {
        session = (ctx.req.session && ctx.req.session.user) || {};
        session.loggedIn = Boolean(session.token);
      }
      return {
        serverRendered: !process.browser,
        session,
        ...await loadGetInitialProps(ComposedComponent, ctx),
      };
    }

    componentDidMount() {
      if (this.props.serverRendered) {
        session = this.props.session;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return connect(null, mapDispatchToProps)(WithSession);
};
