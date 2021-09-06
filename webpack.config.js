// https://dev.to/antonmelnyk/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5
//const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

module.exports = function (env) {
  const isEnvDevelopment = env.development === true;
  const isEnvProduction = env.production === true;

  const postCssOptions = {
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
    sourceMap: isEnvProduction ? false : isEnvDevelopment
  };

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    target: 'web',
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index',
    output: {
      path: isEnvProduction ? path.resolve(__dirname, 'dist') : undefined,
      publicPath: './',
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js'
    },
    devServer: {
      contentBase: [`${__dirname}/public/`],
      watchContentBase: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      quiet: true,
      overlay: true,
      historyApiFallback: true,
      hot: true,
      transportMode: 'ws',
      publicPath: '/'
      //stats: 'minimal',
      //headers: { 'Access-Control-Allow-Origin': '*' },
      //https: false
    },
    plugins: [
      isEnvProduction &&
        new CopyPlugin({
          patterns: [{ from: `${__dirname}/public`, to: `${__dirname}/dist` }]
        }),
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
    ].filter(Boolean),
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            // Added for profiling in devtools
            //keep_classnames: isEnvProductionProfile,
            //keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          sourceMap: true
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true
            }
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }]
          }
        })
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: isEnvDevelopment
      }
    },
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
          use: [
            // Creates `style` nodes from JS strings
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
              loader: MiniCssExtractPlugin.loader,
              // css is located in `static/css`, use '../../' to locate index.html folder
              // in production `paths.publicUrlOrPath` can be a relative path
              options: {
                publicPath: '../../'
              }
            },
            // Translates CSS into CommonJS
            'css-loader',
            {
              // Apply postCSS fixes like autoprefixer and minifying
              loader: 'postcss-loader',
              options: postCssOptions
            }
          ].filter(Boolean)
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
              loader: MiniCssExtractPlugin.loader,
              // css is located in `static/css`, use '../../' to locate index.html folder
              // in production `paths.publicUrlOrPath` can be a relative path
              options: {
                publicPath: '../../'
              }
            },
            // Translates CSS into CommonJS
            'css-loader',
            {
              // Apply postCSS fixes like autoprefixer and minifying
              loader: 'postcss-loader',
              options: postCssOptions
            },
            // Make relative paths work to assets.
            'resolve-url-loader',
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                // Source map is always required as input to resolve-url-loader
                sourceMap: true
              }
            }
          ].filter(Boolean)
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            // Disables attributes processing
            //attributes: false
            attributes: {
              list: [
                '...',
                {
                  tag: 'svg-image',
                  attribute: 'src',
                  type: 'src'
                }
              ]
            }
          }
        },
        {
          test: /\.(bmp|jpg|png|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { name: 'convertColors', params: { currentColor: '#6c63ff' } },
                  { name: 'removeDimensions', active: true },
                  { name: 'removeViewBox', active: false }
                ]
              }
            }
          ],
          exclude: /font.*/
        },
        {
          test: /font.*\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: 'static/font/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  };
};
