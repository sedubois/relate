import { compose } from 'redux';
import configureProgressBar from '../util/routing';
import configureSmooch from '../util/smooch';
import withAnalytics from './withAnalytics';
import withAuth from './withAuth';
import withData from './withData';
import withIntl from './withIntl';
import withLayout from './withLayout';

configureProgressBar();
configureSmooch();

export const pageWithoutLayout = compose(
  withData,
  withAuth,
  withIntl,
  withAnalytics,
);

export default compose(
  pageWithoutLayout,
  withLayout,
);
