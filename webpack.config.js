const path = require("path");
const webpack = require("webpack");
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./app/app.module.js",

  output: {
      path: path.join(__dirname, "bin"),
      filename: "app.bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      { 
        test: /\.html$/, 
        use: "html-loader" 
      },
      { 
        test: /\.(css|scss|sass)$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) 
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        use: "url-loader?limit=100000" 
      }
    ]
  },

  devtool: "#inline-source-map",

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    new ngAnnotatePlugin({
      add: true
    }),

    new ExtractTextPlugin('style.css'),
    
    new webpack.IgnorePlugin(/\.\/locale$/),

    new Dotenv({
      path: './.env',
      safe: true
    })
  ]
}
