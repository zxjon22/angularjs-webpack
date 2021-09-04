// https://dev.to/antonmelnyk/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5
//const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    quiet: true,
    overlay: true,
    historyApiFallback: true,
    hot: true,
    transportMode: 'ws'
    //stats: 'minimal',
    //headers: { 'Access-Control-Allow-Origin': '*' },
    //https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },
      {
        test: /\.css$/,
        // NOTE: PostCSS is missing from here and SASS (below)
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Make relative paths work to assets.
          'resolve-url-loader',
          {
            // Apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssFlexbugsFixes,
                postcssPresetEnv({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                }),
                postcssNormalize()
              ],
              sourceMap: true
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      },
      {
        test: /font.*\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [{ convertColors: { currentColor: '#6c63ff' } }, { removeViewBox: false }]
              }
            }
          }
        ],
        exclude: /font.*/
      }
    ]
  }
};
