import React from 'react';
import { getDataFromTree } from 'react-apollo/server';
import { graphql, ApolloProvider } from 'react-apollo';
// polyfill fetch server-side to get Apollo working:
// https://github.com/zeit/next.js/issues/106#issuecomment-258156495
import 'isomorphic-fetch';
import { IS_SERVER } from '../util/website';
import getClientAndStore from '../data/clientAndStore';
import DataError from '../components/DataError';
import DataLoading from '../components/DataLoading';

function getRootComponent({ client, store }, Component, query) {
  return (
    <ApolloProvider client={client} store={store}>
      <Component {...query} />
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
      headers: React.PropTypes.object,
      query: React.PropTypes.object,
    };

    static async getInitialProps(ctx) {
      const req = ctx.req;
      const headers = req ? req.headers : {};
      const query = ctx.query;
      const clientAndStore = getClientAndStore({}, headers);
      if (IS_SERVER) {
        await getDataFromTree(getRootComponent(clientAndStore, ComposedComponent, query));
      }
      return { initialState: clientAndStore.store.getState(), headers, query };
    }

    constructor(props) {
      super(props);
      if (Object.keys(props).length === 0) {
        throw new Error('apollo.js: Props not defined! Make sure to call getInitialProps.');
      }
      this.clientAndStore = getClientAndStore(props.initialState, props.headers);
    }

    render() {
      return getRootComponent(this.clientAndStore, ComposedComponent, this.props.query);
    }
  }

  return WrapWithApollo;
}

function withErrorAndLoading(Component) {
  function WithErrorAndLoading(props) {
    if (props.data && props.data.error) {
      return <DataError message={props.data.error.message} />;
    }
    if (props.data && props.data.loading) {
      return <DataLoading />;
    }
    return <Component {...props} />;
  }
  WithErrorAndLoading.propTypes = {
    data: React.PropTypes.shape({
      error: React.PropTypes.object,
      loading: React.PropTypes.bool.isRequired,
    }),
  };
  return WithErrorAndLoading;
}

export default function apollo(query, options) {
  return (Component) => {
    const compWithErrorAndLoading = withErrorAndLoading(Component);
    return wrapWithApollo(graphql(query, options)(compWithErrorAndLoading));
  };
}
