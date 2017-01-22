import { SMOOCH_SECRET } from '../config';

export default function configureSmooch() {
  if (process.browser) {
    const Smooch = require('smooch'); // eslint-disable-line global-require
    Smooch.init({ appToken: SMOOCH_SECRET });
  }
}
