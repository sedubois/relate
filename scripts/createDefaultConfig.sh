#!/usr/bin/env bash

SESSION_SECRET_LENGTH=$(node -e "console.log(Math.floor(Math.random() * 10) + 30)")
SESSION_SECRET=$(node -e "require('crypto').randomBytes(${SESSION_SECRET_LENGTH}, (ex, buf) => { console.log(buf.toString('hex')) });")

if [ ! -f config.js ]; then
  cat > config.js << EOF
// read process.env.NODE_ENV to set values depending on environment

module.exports = {
  ANALYTICS_TRACKING_ID: 'FIXME',
  AUTH0_CLIENT_ID: 'FIXME',
  AUTH0_DOMAIN: 'FIXME',
  GRAPHQL_ENDPOINT: 'https://api.graph.cool/simple/v1/citr7kd6a2lo40168fh20r48g',
  NEWSLETTER_FORM_ACTION: 'FIXME',
  NEWSLETTER_FORM_INPUT_NAME: 'FIXME',
  SMOOCH_SECRET: 'FIXME',
};
EOF
fi;

if [ ! -f server/config.js ]; then
  cat > server/config.js << EOF
// read process.env.NODE_ENV to set values depending on environment

module.exports = {
  SESSION_SECRET: '${SESSION_SECRET}',
};
EOF
fi;
