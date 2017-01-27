import { Component, PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import { connect } from 'react-redux';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import en from '../config/en';

addLocaleData([...enLocaleData]);

const intlMessages = {
  en,
};

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
        <IntlProvider locale={this.props.locale} messages={intlMessages[this.props.locale]}>
          <ComposedComponent {...this.props} />
        </IntlProvider>
      );
    }
  }

  return connect(mapStateToProps)(WithIntl);
};
