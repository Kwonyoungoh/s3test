const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'app', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader',   // 2. Turns css into commonjs
          'sass-loader'   // 1. Turns sass into css
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss']
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'app'),
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    })
  ]
};