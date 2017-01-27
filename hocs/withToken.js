import { Component, PropTypes } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { getToken, storeTokenLocally } from '../util/auth';

export default ComposedComponent => (
  class WithUserToken extends Component {
    static propTypes = {
      serverRendered: PropTypes.bool.isRequired,
      userToken: PropTypes.string,
    };

    static defaultProps = {
      userToken: null,
    };

    static async getInitialProps(ctx) {
      const userToken = await getToken(ctx);
      return {
        loggedIn: Boolean(userToken),
        serverRendered: !process.browser,
        userToken,
        ...await loadGetInitialProps(ComposedComponent, ctx),
      };
    }

    componentDidMount() {
      if (this.props.serverRendered) {
        storeTokenLocally(this.props.userToken);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
);
