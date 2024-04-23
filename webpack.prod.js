const path = require('path');
const Dotenv  = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'app', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[id].[contenthash].js'
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
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
          MiniCssExtractPlugin.loader, // 대신 style-loader
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin(), // dist 폴더를 정리
    new MiniCssExtractPlugin({ // CSS를 별도의 파일로 추출
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      minify: { // HTML 파일 최적화
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  ]
};