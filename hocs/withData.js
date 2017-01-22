import { Component, PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import 'isomorphic-fetch';
import getClientAndStore from '../data/clientAndStore';

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

      if (!process.browser) {
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

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <ComposedComponent url={this.props.url} />
        </ApolloProvider>
      );
    }
  }
);
