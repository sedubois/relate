import { SMOOCH_SECRET } from '../config';
import { IS_BROWSER } from '../util/website';

export default function configureSmooch() {
  if (IS_BROWSER) {
    const Smooch = require('smooch'); // eslint-disable-line global-require
    Smooch.init({ appToken: SMOOCH_SECRET });
  }
}
