// TODO delete this file

import { Component, PropTypes } from 'react';
import { getDataFromTree, graphql, ApolloProvider } from 'react-apollo';
// polyfill fetch server-side to get Apollo working:
// https://github.com/zeit/next.js/issues/106#issuecomment-258156495
import 'isomorphic-fetch';
import { IS_SERVER } from '../util/website';
import DataError from '../components/DataError';
import DataLoading from '../components/DataLoading';

function getRootComponent({ apolloClient, reduxStore }, ComposedComponent, query) {
  return (
    <ApolloProvider client={apolloClient} store={reduxStore}>
      <ComposedComponent {...query} />
    </ApolloProvider>
  );
}
getRootComponent.propTypes = {
  apolloClient: PropTypes.object.isRequired,
  reduxStore: PropTypes.object.isRequired,
};

function wrapWithApollo(ComposedComponent) {
  class WrapWithApollo extends Component {
    static propTypes = {
      initialState: PropTypes.object,
      headers: PropTypes.object,
      query: PropTypes.object,
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

function withErrorAndLoading(ComposedComponent, Error, Loading) {
  function WithErrorAndLoading(props) {
    const error = props.data && props.data.error;
    if (error) {
      console.error(error.message); // eslint-disable-line no-console
      return <Error message={error.message} />;
    }
    if (props.data && props.data.loading) {
      return <Loading />;
    }
    return <ComposedComponent {...props} />;
  }
  WithErrorAndLoading.propTypes = {
    data: PropTypes.shape({
      error: PropTypes.object,
      loading: PropTypes.bool,
    }),
  };
  return WithErrorAndLoading;
}

export default function apollo(query, apolloOptions, {
  Error = DataError,
  Loading = DataLoading,
  ssr = true,
} = {}) {
  return (ComposedComponent) => {
    const comp = withErrorAndLoading(ComposedComponent, Error, Loading);
    const graphqlComp = graphql(query, apolloOptions)(comp);
    return ssr ? wrapWithApollo(graphqlComp) : graphqlComp;
  };
}
