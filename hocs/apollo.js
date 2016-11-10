import React from 'react';
import { getDataFromTree } from 'react-apollo/server';
import { graphql, ApolloProvider } from 'react-apollo';
// polyfill fetch server-side to get Apollo working:
// https://github.com/zeit/next.js/issues/106#issuecomment-258156495
import 'isomorphic-fetch';
import { IS_SERVER } from '../util/website';
import DataError from '../components/DataError';
import DataLoading from '../components/DataLoading';

function getRootComponent({ apolloClient, reduxStore }, Component, query) {
  return (
    <ApolloProvider client={apolloClient} store={reduxStore}>
      <Component {...query} />
    </ApolloProvider>
  );
}
getRootComponent.propTypes = {
  apolloClient: React.PropTypes.object.isRequired,
  reduxStore: React.PropTypes.object.isRequired,
};

function wrapWithApollo(ComposedComponent) {
  class WrapWithApollo extends React.Component {
    static propTypes = {
      initialState: React.PropTypes.object,
      headers: React.PropTypes.object,
      query: React.PropTypes.object,
    };

    static async getInitialProps(ctx) {
      if (IS_SERVER) {
        await getDataFromTree(getRootComponent(ctx, ComposedComponent, ctx.query));
      }
      return {};
    }

    render() {
      return <ComposedComponent {...this.props.query} />;
    }
  }

  return WrapWithApollo;
}

function withErrorAndLoading(Component, Error, Loading) {
  function WithErrorAndLoading(props) {
    const error = props.data && props.data.error;
    if (error) {
      console.error(error.message); // eslint-disable-line no-console
      return <Error message={error.message} />;
    }
    if (props.data && props.data.loading) {
      return <Loading />;
    }
    return <Component {...props} />;
  }
  WithErrorAndLoading.propTypes = {
    data: React.PropTypes.shape({
      error: React.PropTypes.object,
      loading: React.PropTypes.bool,
    }),
  };
  return WithErrorAndLoading;
}

export default function apollo(query, apolloOptions, {
  Error = DataError,
  Loading = DataLoading,
  ssr = true,
} = {}) {
  return (Component) => {
    const comp = withErrorAndLoading(Component, Error, Loading);
    const graphqlComp = graphql(query, apolloOptions)(comp);
    return ssr ? wrapWithApollo(graphqlComp) : graphqlComp;
  };
}
