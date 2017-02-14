import { Component, PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import 'isomorphic-fetch';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { getLocale } from '../data/intl/lib';
import baseUrl from '../util/baseUrl';
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
      locale = getLocale(ctx);
      if (!intlCache.has(locale)) {
        const url = `${baseUrl || `http://${ctx.req.headers.host}`}/api/intl/${locale}`;
        const res = await fetch(url);
        intlCache.set(locale, await res.json());
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
