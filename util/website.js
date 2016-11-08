export const IS_SERVER = typeof window === 'undefined';

export const BASE_URL = IS_SERVER
  ? undefined
  : window.location.origin ||
    `${window.location.protocol}//${window.location.hostname}${window.location.port
      ? `:${window.location.port}`
      : ''}`;
