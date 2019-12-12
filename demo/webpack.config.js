const path = require('path');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./demo.js'],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'demo.min.js',
    publicPath: '/assets',
    library: 'Expand',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].min.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin()
  ]
};
