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
    publicPath: '/assets/'
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
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.join(__dirname, './node_modules'),
    ],
  },
  plugins: [
    new DotenvPlugin({
      path: './config/.dev.env',
      sample: './config/.dev.sample.env'
    })
  ]
};
