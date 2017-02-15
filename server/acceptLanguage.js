const acceptLanguage = require('accept-language');
const locales = require('../universal/locales');

acceptLanguage.languages(locales);

module.exports = function getAcceptLanguage(req) {
  const acceptLanguageHeader = req.headers['accept-language'];
  const locale = acceptLanguage.get(acceptLanguageHeader);
  if (locales.includes(locale)) {
    return locale;
  }
  // eslint-disable-next-line no-console
  console.warn('Unable to detect locale from HTTP context:', acceptLanguageHeader, locale);
  return locales[0];
};
