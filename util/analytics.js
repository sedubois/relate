import { ANALYTICS_TRACKING_ID } from '../config';

let ReactGA;
if (process.browser) {
  ReactGA = require('react-ga'); // eslint-disable-line global-require
}

export function configureAnalytics() {
  if (process.browser) {
    ReactGA.initialize(ANALYTICS_TRACKING_ID);
  }
}

export function pageView() {
  if (process.browser) {
    const page = window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }
}
