<img src="https://github.com/RelateNow/art/blob/master/assets/hero.png" alt="hero" align="center" />

<br />

<div align="center">
  <h1>Relate</h1>
  Relate brings together mindfulness communities, teachers and individuals.
  <br />
  <strong>
    <a href="https://medium.com/@sedubois/the-way-we-relate-the-world-we-create-2d8f79300b7f">
      Read the article on Medium
    </a>
  </strong>
  <br />
  <sub>Made with ❤︎ by <a href="https://sdubois.now.sh">Sébastien Dubois</a></sub>
</div>

[![Slack Channel](https://relate-slack.now.sh/badge.svg)](https://relate-slack.now.sh)
[![Greenkeeper badge](https://badges.greenkeeper.io/relatenow/relate.svg)](https://greenkeeper.io/)

## Stack

[Read this](https://github.com/relatenow/relate/issues/5) for the reasoning behind the technology choices.

- [React](https://facebook.github.io/react) rendering
- [Redux](http://redux.js.org) state management
- [Redux-thunk](https://github.com/gaearon/redux-thunk) for async/conditional state changes
- [GraphQL](http://graphql.org) API query language
- [Apollo](http://dev.apollodata.com) GraphQL client
- [Graphcool](https://www.graph.cool) GraphQL/lambda backend-as-a-service
- [Next.js](https://zeit.co/blog/next) universal webapp framework (server-side rendering, single-page experience)
- [Next-Routes](https://github.com/fridays/next-routes) to manage dynamic routing configuration
- [Now](https://zeit.co/now) deployment
- [Auth0](https://auth0.com) user authentication
- [lru-cache](https://github.com/isaacs/node-lru-cache) for server-side caching of HTML pages
- [React-ga](https://github.com/react-ga/react-ga) for [Google Analytics](https://www.google.com/analytics)</a>
- [React-intl](https://github.com/yahoo/react-intl) for internationalization
- [accept-language](https://github.com/tinganho/node-accept-language) for detection of browser's language preference
- [MailChimp](https://mailchimp.com) newsletter registration

Development:
- [Webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to visualize the bundled code contents

## Development

- `git clone https://github.com/relatenow/relate && cd relate`
- `yarn`
- `yarn dev`
- navigate to <http://localhost:3000>
- do something amazing :tada:

NB: `yarn` will create `config.js` and `server/config.js` for you (through the `postinstall` hook). Edit these files to configure integrations such as GraphQL and analytics.

## Credit

See the [LICENSE](LICENSE) file for license rights and limitations (GPLv3).

Copyright (c) 2016-2017 Sébastien Dubois <https://sdubois.now.sh>.
