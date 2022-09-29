const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./assets/demo.js', './assets/demo.scss'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.min.js',
    publicPath: '/assets',
    library: 'Expand',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'expand.min.css',
      chunkFilename: '[id].css'
    })
  ]
};

