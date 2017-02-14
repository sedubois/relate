/* eslint-disable no-param-reassign */
module.exports = {
  webpack: (config) => {
    config.externals = {
      fs: 'fs',
    };
    return config;
  },
};
