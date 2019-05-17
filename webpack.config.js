const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    vendor: "./src/index.js",
  },
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: {loader: 'html-loader'},
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'],
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'WCH TEST',
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
}