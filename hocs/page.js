import React from 'react';
import css from 'next/css';
import { ApolloProvider } from 'react-apollo';
import getClientAndStore from '../data/clientAndStore';
import HtmlHead from '../components/HtmlHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

css.insertRule(`
  a {
    color: #A78100;
    text-decoration: none;
  }
  
  body {
    margin: 0;
  }
  
  .auth0-lock-header {
    display: none;
  }
`);

const style = css({
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  maxWidth: 'calc(768px + 16px * 2)',
  margin: '0 auto',
  display: 'flex',
  minHeight: '100%',
  padding: '0 16px',
  flexDirection: 'column',
});

export default function page(WrappedComponent) {
  class Page extends React.Component {
    static propTypes = {
      url: React.PropTypes.shape({
        pathname: React.PropTypes.string.isRequired,
      }).isRequired,
      initialState: React.PropTypes.object.isRequired,
      headers: React.PropTypes.object,
    };

    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const query = ctx.query;
      const clientAndStore = getClientAndStore({}, headers);
      let subProps;
      if (WrappedComponent.getInitialProps) {
        const extendedCtx = Object.assign({}, ctx, clientAndStore);
        subProps = await WrappedComponent.getInitialProps(extendedCtx);
      }
      const props = { initialState: clientAndStore.reduxStore.getState(), headers, query };
      Object.assign(props, subProps);
      return props;
    }

    constructor(props) {
      super(props);
      if (Object.keys(props).length === 0) {
        throw new Error('page.js: Props not defined! Make sure to call getInitialProps.');
      }
      const clientAndStore = getClientAndStore(props.initialState, props.headers);
      this.apolloClient = clientAndStore.apolloClient;
      this.reduxStore = clientAndStore.reduxStore;
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <div className={style}>
            <HtmlHead />
            <Header pathname={this.props.url.pathname} />
            <WrappedComponent {...this.props} />
            <Footer />
          </div>
        </ApolloProvider>
      );
    }
  }

  return Page;
}
