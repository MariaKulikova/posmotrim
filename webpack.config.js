const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      main: './src/js/index.js',
      styles: './src/styles/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      publicPath: './',
      clean: true
    },
    
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080,
      hot: true,
      open: false,
      watchFiles: ['src/**/*', 'index.html', 'assets/**/*']
    },
    
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'assets/scss')]
                }
              }
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            sources: false
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        }
      ]
    },
    
    plugins: [
      new CleanWebpackPlugin(),
      
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: true,
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false
        } : false,
        templateParameters: {
          PUBLIC_URL: ''
        }
      }),
      
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets/images',
            to: 'images',
            noErrorOnMissing: true
          }
        ]
      })
    ],
    
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  };
};