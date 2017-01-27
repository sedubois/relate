import { Component, PropTypes } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { configureAnalytics, pageView } from '../util/analytics';
import configureProgressBar from '../util/routing';
import configureSmooch from '../util/smooch';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HtmlHead from '../components/HtmlHead';
import withData from './withData';
import withIntl from './withIntl';

configureAnalytics();
configureProgressBar();
configureSmooch();

// color palette: http://paletton.com/#uid=33m0y0ksMDf8jVahZJZEepkKleL

const page = ComposedComponent => class Page extends Component {
  static propTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  static async getInitialProps(ctx) {
    return loadGetInitialProps(ComposedComponent, ctx);
  }

  componentWillMount() {
    pageView();
  }

  render() {
    return (
      <div className="wrapper">
        <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          font-family: Raleway, "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 85%;
          margin: 0 auto;
          max-width: 960px;
          min-height: 100%;
          padding: 0 16px;
        }
      `}</style>
        <style jsx global>{`
        a {
          color: #02697C;
          text-decoration: none;
        }

        body {
          margin: 0;
        }
      `}</style>
        <HtmlHead />
        <Header url={this.props.url} loggedIn={this.props.loggedIn} />
        <ComposedComponent {...this.props} />
        <Footer />
      </div>
    );
  }
};

export default ComposedComponent => withData(withIntl(page(ComposedComponent)));
