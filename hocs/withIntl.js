import { Component, PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import locales from '../data/intl/locales';

Object.keys(locales).map(locale => addLocaleData([...locales[locale].data]));

function mapStateToProps({ intl: { locale } }) {
  return {
    locale,
  };
}

export default (ComposedComponent) => {
  class WithIntl extends Component {
    static propTypes = {
      locale: PropTypes.string.isRequired,
    };

    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx);
    }

    render() {
      return (
        <IntlProvider locale={this.props.locale} messages={locales[this.props.locale].messages}>
          <ComposedComponent {...this.props} />
        </IntlProvider>
      );
    }
  }

  return connect(mapStateToProps)(WithIntl);
};
