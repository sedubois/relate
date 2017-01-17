#!/usr/bin/env bash

if [ ! -f config.js ]; then
  cat > config.js << EOF
export const ANALYTICS_TRACKING_ID = 'XXX';
export const AUTH0_CLIENT_ID = 'XXX';
export const AUTH0_DOMAIN = 'XXX';
export const GRAPHQL_ENDPOINT = 'https://api.graph.cool/simple/v1/citr7kd6a2lo40168fh20r48g';
export const NEWSLETTER_FORM_ACTION = 'XXX';
export const NEWSLETTER_FORM_INPUT_NAME = 'XXX';
export const SMOOCH_SECRET = 'XXX';
EOF
fi;
