var paths = require('./paths');
var cssnext = require('postcss-cssnext');

module.exports = {
  entry: [
    require.resolve('./polyfills')
  ],
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test:   /\.sss/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss?parser=sugarss'
      },
    ],
  },
  postcss: function() {
    return [cssnext];
  }
};
