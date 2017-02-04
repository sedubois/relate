import ALL_LOCALES from './locales';
import execXhr from '../../util/xhr';

export const SET_LOCALE = 'SET_LOCALE';

export async function setLocale(locale) {
  if (!Object.keys(ALL_LOCALES).includes(locale)) {
    throw new Error(`Unrecognized locale: '${locale}'`);
  }

  // update server-side
  await execXhr({
    method: 'PATCH',
    url: '/api/session',
    payload: { locale },
  });

  // update client-side
  return {
    type: SET_LOCALE,
    locale,
  };
}
