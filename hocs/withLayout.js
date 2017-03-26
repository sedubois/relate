import { Component, PropTypes } from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import configureProgressBar from '../util/routing';
import Footer from '../components/Footer';
import Header from '../components/Header';

// color palette: http://paletton.com/#uid=33m0y0ksMDf8jVahZJZEepkKleL

export default ComposedComponent => class WithLayout extends Component {
  static propTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
    }).isRequired,
    locale: PropTypes.string.isRequired,
  };

  static async getInitialProps(ctx) {
    return loadGetInitialProps(ComposedComponent, ctx);
  }

  componentDidMount() {
    configureProgressBar();
  }

  render() {
    return (
      <div>
        <Header url={this.props.url} loggedIn={this.props.auth.loggedIn} />
        <ComposedComponent {...this.props} />
        <Footer locale={this.props.locale} />
      </div>
    );
  }
};
