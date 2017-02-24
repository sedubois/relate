import { Component, PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import 'isomorphic-fetch';
import getClientAndStore from '../data/clientAndStore';

function getInitialState(apolloClient, reduxStore) {
  return {
    ...reduxStore.getState(),
    [apolloClient.reduxRootKey]: {
      data: apolloClient.getInitialState().data,
    },
  };
}

export default ComposedComponent => (
  class WithData extends Component {
    static propTypes = {
      initialState: PropTypes.object.isRequired,
      clientAndStoreProps: PropTypes.shape({
        authToken: PropTypes.string,
      }).isRequired,
    };

    static async getInitialProps(ctx) {
      const subProps = await loadGetInitialProps(ComposedComponent, ctx);
      const clientAndStoreProps = {
        authToken: subProps.auth.token,
      };
      const { apolloClient, reduxStore } = getClientAndStore({}, clientAndStoreProps);

      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...subProps,
      };

      if (!process.browser) {
        await getDataFromTree((
          <ApolloProvider client={apolloClient} store={reduxStore}>
            <ComposedComponent {...props} />
          </ApolloProvider>
        ));
      }

      return {
        initialState: getInitialState(apolloClient, reduxStore),
        clientAndStoreProps,
        ...props,
      };
    }

    constructor(props) {
      super(props);
      const clientAndStore = getClientAndStore(this.props.initialState,
        this.props.clientAndStoreProps);
      this.apolloClient = clientAndStore.apolloClient;
      this.reduxStore = clientAndStore.reduxStore;
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
