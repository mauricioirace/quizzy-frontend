const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
module.exports = {
  context: path.join(__dirname, './app'),
  entry: [
    './root.js',
  ],
  output: {
    path: path.join(__dirname, './dist/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader',
                options: {
                  modules: false,
                  importLoaders: 1,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              { loader: 'css-loader',
                options: {
                  modules: false,
                  importLoaders: 1,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                }
              },
              'sass-loader'
            ]
          },
          {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
          }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.join(__dirname, '../node_modules'),
    ],
  },
    plugins: [
        new DotenvPlugin({
            path: './.dev.env',
            sample: './.dev.sample.env'
        })
    ]
}
