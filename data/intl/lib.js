import locales from '../../universal/locales';
import mapDispatch from '../../util/redux';
import execXhr from '../../util/xhr';

export function getLocale(ctx) {
  if (!process.browser) {
    if (!ctx.req.session.user) {
      ctx.req.session.user = {}; // eslint-disable-line no-param-reassign
    }
    const locale = ctx.req.session.user.locale || ctx.req.language;

    if (locales.includes(locale)) {
      return locale;
    }
    // eslint-disable-next-line no-console
    console.warn('intl/lib warning: Unable to detect locale from HTTP context:', locale);
    ctx.req.session.user.locale = 'en'; // eslint-disable-line no-param-reassign
    return 'en';
  }
  return undefined;
}

async function setLocale(dispatch, locale) {
  if (!locales.includes(locale)) {
    throw new Error(`Unrecognized locale: '${locale}'`);
  }

  // update server-side session
  await execXhr({
    method: 'PATCH',
    url: '/api/session',
    payload: { locale },
  });

  // force reload from server to get the proper locale data
  window.location.reload(true);
}

export const mapDispatchToSetLocale = mapDispatch('setLocale', setLocale);
