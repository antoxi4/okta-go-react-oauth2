const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mainBundleFilePath = 'main.bundle.js';
const appFolderPath = path.resolve(__dirname);
const publicFolderPath = path.join(appFolderPath, 'public');
const indexHTMLFilePath = path.join(publicFolderPath, 'index.html');

const htmlWebPackPlugin = new HtmlWebpackPlugin({
  filename: '../index.html',
  template: indexHTMLFilePath,
  inject: false
});

module.exports = {
  context: appFolderPath,
  entry: ['./src/index.tsx'],
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    publicPath: '/static/',
    path: path.join(__dirname, 'dist/static')
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    modules: [path.join(appFolderPath, '/src'), 'node_modules'],
    extensions: ['*', '.ts', '.js', '.jsx', '.tsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { useCache: true } },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebPackPlugin
  ]
};