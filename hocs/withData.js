import { Component, PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import 'isomorphic-fetch';
import getClientAndStore from '../data/clientAndStore';
import { IS_SERVER } from '../util/website';
import { resetStore } from '../data/client';

let storeHasBeenReset = false;

export default ComposedComponent => (
  class WithData extends Component {
    static propTypes = {
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      initialState: PropTypes.object.isRequired,
      headers: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const { apolloClient, reduxStore } = getClientAndStore({}, headers);

      if (IS_SERVER) {
        await getDataFromTree((
          <ApolloProvider client={apolloClient} store={reduxStore}>
            <ComposedComponent url={{ query: ctx.query, pathname: ctx.pathname }} />
          </ApolloProvider>
        ));
      }

      const state = reduxStore.getState();
      return {
        initialState: {
          ...state,
          apollo: {
            data: state.apollo.data,
          },
        },
        headers,
      };
    }

    constructor(props) {
      super(props);
      const clientAndStore = getClientAndStore(this.props.initialState, this.props.headers);
      this.apolloClient = clientAndStore.apolloClient;
      this.reduxStore = clientAndStore.reduxStore;
    }

    componentDidMount() {
      if (!storeHasBeenReset) {
        // This is a hack to force an Apollo re-fetch of data client-side,
        // where the user token is known (stored in localStorage).
        // TODO proper solution is to access user token server-side
        // by customising the Next.js server with session management.
        // see https://github.com/zeit/next.js/issues/153
        storeHasBeenReset = true;
        resetStore();
      }
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <ComposedComponent url={this.props.url} />
        </ApolloProvider>
      );
    }
  }
);
