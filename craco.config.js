const webpack = require('webpack');

module.exports = {
  // ✅ Disable ESLint (fixes eslint-loader error on Vercel)
  eslint: {
    enable: false,
  },

  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills
      webpackConfig.resolve.fallback = {
        vm: require.resolve('vm-browserify'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        assert: require.resolve('assert'),
        fs: false,
        os: false,
        process: require.resolve('process/browser'),
      };

      // Add plugins
      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ]);

      // Fix for @lezer/lr
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });

      return webpackConfig;
    },
  },
};
