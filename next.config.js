/* eslint-disable no-param-reassign */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config) => {
    config.externals = {
      fs: 'fs',
    };

    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'analyze') {
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
