/* eslint-disable no-param-reassign */

module.exports = {
  webpack: (config) => {
    config.externals = {
      fs: 'fs',
    };

    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'analyze') {
      // eslint-disable-next-line
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
          analyzerMode: 'disabled',
          generateStatsFile: true,
          // then view stats with webpack-bundle-analyzer .next/stats.json
          statsFilename: 'stats.json',
        }));
    }

    return config;
  },
};
