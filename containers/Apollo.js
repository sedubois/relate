import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getDataFromTree } from 'react-apollo/server';
import { graphql, ApolloProvider } from 'react-apollo';
// polyfill fetch server-side to get Apollo working:
// https://github.com/zeit/next.js/issues/106#issuecomment-258156495
import 'isomorphic-fetch';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import DataError from '../components/DataError';
import DataLoading from '../components/DataLoading';

function getReducer(client) {
  return combineReducers({
    apollo: client.reducer(),
  });
}

function getClient(headers) {
  return new ApolloClient({
    networkInterface: createNetworkInterface({ uri: process.env.GRAPHQL_ENDPOINT }),
    ssrMode: true,
    headers,
  });
}

function initClientAndStore(initialState, isServer, headers) {
  // on first page load, the JSON props will be created server-side, with isServer = true,
  // but then sent to the browser where it will be evaluated. Therefore, need to also check
  // `typeof window === 'undefined'` to make sure not to re-create the store on browser side.
  if (isServer && typeof window === 'undefined') {
    const client = getClient(headers);
    const middleware = applyMiddleware(client.middleware());
    return {
      client,
      store: createStore(getReducer(client), initialState, middleware),
    };
  }
  if (!window.clientAndStore) {
    const client = getClient(headers);
    const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
    const middleware = compose(applyMiddleware(client.middleware()), devTools);
    window.clientAndStore = {
      client,
      store: createStore(getReducer(client), initialState, middleware),
    };
  }
  return window.clientAndStore;
}

function getRootComponent({ client, store }, Component) {
  return (
    <ApolloProvider client={client} store={store}>
      <Component />
    </ApolloProvider>
  );
}
getRootComponent.propTypes = {
  client: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired,
};

function wrapWithApollo(ComposedComponent) {
  class WrapWithApollo extends React.Component {
    static propTypes = {
      initialState: React.PropTypes.object,
      isServer: React.PropTypes.bool,
      headers: React.PropTypes.object,
    };

    static async getInitialProps(ctx) {
      const req = ctx.req;
      const isServer = !!req;
      const headers = req ? req.headers : {};
      const clientAndStore = initClientAndStore({}, isServer, headers);
      if (isServer) {
        await getDataFromTree(getRootComponent(clientAndStore, ComposedComponent));
      }
      return { initialState: clientAndStore.store.getState(), isServer, headers };
    }

    constructor(props) {
      super(props);
      if (Object.keys(props).length === 0) {
        throw new Error('apollo.js: Props not defined! Make sure to call getInitialProps.');
      }
      this.clientAndStore = initClientAndStore(props.initialState, props.isServer, props.headers);
    }

    render() {
      return getRootComponent(this.clientAndStore, ComposedComponent);
    }
  }

  return WrapWithApollo;
}

function withErrorAndLoading(Component) {
  function WithErrorAndLoading(props) {
    if (props.data.error) {
      return <DataError message={props.data.error.message} />;
    }
    if (props.data.loading) {
      return <DataLoading />;
    }
    return <Component {...props} />;
  }
  WithErrorAndLoading.propTypes = {
    data: React.PropTypes.shape({
      error: React.PropTypes.object,
      loading: React.PropTypes.bool.isRequired,
    }).isRequired,
  };
  return WithErrorAndLoading;
}

export default function apollo(query, options) {
  return (Component) => {
    const compWithErrorAndLoading = withErrorAndLoading(Component);
    return wrapWithApollo(graphql(query, options)(compWithErrorAndLoading));
  };
}
