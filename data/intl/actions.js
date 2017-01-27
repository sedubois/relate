export const SET_LOCALE = 'SET_LOCALE';

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  };
}
