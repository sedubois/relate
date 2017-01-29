import { compose } from 'redux';
import configureProgressBar from '../util/routing';
import configureSmooch from '../util/smooch';
import withAnalytics from './withAnalytics';
import withData from './withData';
import withIntl from './withIntl';
import withLayout from './withLayout';
import withSession from './withSession';

configureProgressBar();
configureSmooch();

export default compose(
  withData,
  withSession,
  withIntl,
  withAnalytics,
  withLayout,
);
