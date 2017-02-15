import { Component, PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import 'isomorphic-fetch';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import localeData from '../data/intl/localeData';

// server-side: for performance, keep in memory messages for different locales
const intlCache = new Map();
//  client-side: remember the user's locale messages across page changes
let locale;
let messages;

export default ComposedComponent => class WithIntl extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    serverRendered: PropTypes.bool.isRequired,
  };

  static async getInitialProps(ctx) {
    if (!process.browser) {
      locale = ctx.req.session.user.locale;
      if (!intlCache.has(locale)) {
        const messageFile = require.resolve(`../data/intl/${locale}.json`);
        // eslint-disable-next-line global-require
        messages = JSON.parse(require('fs').readFileSync(messageFile, 'utf8'));
        intlCache.set(locale, messages);
      }
      messages = intlCache.get(locale);
    }
    return {
      locale,
      messages,
      ...loadGetInitialProps(ComposedComponent, ctx),
    };
  }

  constructor(props) {
    super(props);
    locale = props.locale;
    messages = props.messages;
    if (props.serverRendered) {
      addLocaleData([...localeData[locale]]);
    }
  }

  render() {
    return (
      <IntlProvider locale={locale} messages={messages}>
        <ComposedComponent {...this.props} />
      </IntlProvider>
    );
  }
};
