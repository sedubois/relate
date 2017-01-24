import { Component, PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import 'isomorphic-fetch';
import getClientAndStore from '../data/clientAndStore';
import { getToken, storeTokenLocally } from '../util/auth';
import getProps from '../util/initialProps';

export default ComposedComponent => (
  class WithData extends Component {
    static propTypes = {
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      initialState: PropTypes.object.isRequired,
      headers: PropTypes.object.isRequired,
      userToken: PropTypes.string,
      serverRendered: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      userToken: null,
    };

    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const userToken = await getToken(ctx);
      const { apolloClient, reduxStore } = getClientAndStore({}, headers, userToken);

      const props = {
        loggedIn: Boolean(userToken),
        serverRendered: !process.browser,
        url: { query: ctx.query, pathname: ctx.pathname },
        userToken,
        ...await getProps(ComposedComponent, ctx),
      };

      if (!process.browser) {
        await getDataFromTree((
          <ApolloProvider client={apolloClient} store={reduxStore}>
            <ComposedComponent {...props} />
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
        ...props,
      };
    }

    constructor(props) {
      super(props);
      const clientAndStore = getClientAndStore(
        this.props.initialState, this.props.headers, this.props.userToken);
      this.apolloClient = clientAndStore.apolloClient;
      this.reduxStore = clientAndStore.reduxStore;
    }

    componentDidMount() {
      if (this.props.serverRendered) {
        storeTokenLocally(this.props.userToken);
      }
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
);
