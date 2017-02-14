/* eslint-disable no-param-reassign */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config, { dev }) => {
    config.externals = {
      fs: 'fs',
    };

    if (dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
          analyzerMode: 'server',
          analyzerHost: '127.0.0.1',
          analyzerPort: 8888,
          openAnalyzer: false,
        }));
    }

    return config;
  },
};
