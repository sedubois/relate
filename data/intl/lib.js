import locales from '../../universal/locales';
import mapDispatch from '../../util/redux';
import execXhr from '../../util/xhr';

async function setLocale(dispatch, locale) {
  if (!locales.includes(locale)) {
    throw new Error(`Unrecognized locale: '${locale}'`);
  }

  // update server-side session
  await execXhr({
    method: 'PATCH',
    url: '/api/auth',
    payload: { locale },
  });

  // force reload from server to get the proper locale data
  window.location.reload(true);
}

export default mapDispatch('setLocale', setLocale);
