import React from 'react';
import css from 'next/css';
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
    };

    static async getInitialProps(ctx) {
      const props = {};
      if (WrappedComponent.getInitialProps) {
        const subProps = await WrappedComponent.getInitialProps(ctx);
        Object.assign(props, subProps);
      }
      return props;
    }

    constructor(props) {
      super(props);
      if (Object.keys(props).length === 0) {
        throw new Error('page.js: Props not defined! Make sure to call getInitialProps.');
      }
    }

    render() {
      return (
        <div className={style}>
          <HtmlHead />
          <Header pathname={this.props.url.pathname} />
          <WrappedComponent {...this.props} />
          <Footer />
        </div>
      );
    }
  }

  return Page;
}
