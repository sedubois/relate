import { Component, PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import 'isomorphic-fetch';
import getClientAndStore from '../data/clientAndStore';

export default ComposedComponent => (
  class WithData extends Component {
    static propTypes = {
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      initialState: PropTypes.object.isRequired,
      clientAndStoreProps: PropTypes.shape({
        authToken: PropTypes.string,
        browserLocale: PropTypes.string, // not needed client-side (available in Redux store)
        headers: PropTypes.object.isRequired,
      }).isRequired,
    };

    static async getInitialProps(ctx) {
      const subProps = await loadGetInitialProps(ComposedComponent, ctx);
      const clientAndStoreProps = {
        authToken: subProps.session.token,
        browserLocale: ctx.req && ctx.req.language,
        headers: ctx.req ? ctx.req.headers : {},
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

      const state = reduxStore.getState();
      return {
        initialState: {
          ...state,
          apollo: {
            data: state.apollo.data,
          },
        },
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
