import { ANALYTICS_TRACKING_ID } from '../config';
import { IS_BROWSER } from '../util/website';

let ReactGA;
if (IS_BROWSER) {
  ReactGA = require('react-ga'); // eslint-disable-line global-require
}

export function configureAnalytics() {
  if (IS_BROWSER) {
    ReactGA.initialize(ANALYTICS_TRACKING_ID);
  }
}

export function pageView() {
  if (IS_BROWSER) {
    const page = window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }
}
