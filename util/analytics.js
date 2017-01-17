import { ANALYTICS_TRACKING_ID } from '../config';
import { IS_BROWSER } from '../util/website';

export function configureAnalytics() {
  if (IS_BROWSER) {
    // eslint-disable-next-line
    window.ga = window.ga || function () {(ga.q = ga.q || []).push(arguments)};ga.l = +new Date;
    /* global ga: true */
    ga('create', ANALYTICS_TRACKING_ID, 'auto');
    ga('require', 'urlChangeTracker');
    /* eslint-disable global-require */
    require('autotrack/lib/plugins/clean-url-tracker');
    ga('require', 'cleanUrlTracker');
    require('autotrack/lib/plugins/outbound-form-tracker');
    ga('require', 'outboundFormTracker');
    require('autotrack/lib/plugins/outbound-link-tracker');
    /* eslint-enable global-require */
    ga('require', 'outboundLinkTracker');
  }
}

export function pageView() {
  if (IS_BROWSER) {
    const page = window.location.pathname;
    ga('set', 'page', page);
    ga('send', 'pageview');
  }
}
