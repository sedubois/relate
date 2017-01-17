import { Component, PropTypes } from 'react';
import { configureAnalytics, pageView } from '../util/analytics';
import configureProgressBar from '../util/routing';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HtmlHead from '../components/HtmlHead';
import withData from './withData';

configureAnalytics();
configureProgressBar();

// color palette: http://paletton.com/#uid=33m0y0ksMDf8jVahZJZEepkKleL

const page = WrappedComponent => class Page extends Component {
  static propTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

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

        .auth0-lock-header {
          display: none;
        }
      `}</style>
        <HtmlHead />
        <Header url={this.props.url} />
        <WrappedComponent {...this.props} />
        <Footer />
      </div>
    );
  }
};

export default WrappedComponent => withData(page(WrappedComponent));
