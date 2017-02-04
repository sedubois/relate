import ALL_LOCALES from '../data/intl/locales';

export default function getInitialLocale(ctx) {
  if (!process.browser) {
    if (!ctx.req.session.user) {
      ctx.req.session.user = {}; // eslint-disable-line no-param-reassign
    }
    const locale = ctx.req.session.user.locale || ctx.req.language;

    if (Object.keys(ALL_LOCALES).includes(locale)) {
      return locale;
    }
    console.warn('intl.js warning: Unable to detect locale from HTTP context:', locale);
    ctx.req.session.user.locale = 'en'; // eslint-disable-line no-param-reassign
    return 'en';
  }
  return undefined;
}
