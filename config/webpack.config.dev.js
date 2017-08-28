const path = require('path')

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: [
    './root.js',
  ],
  output: {
    path: path.join(__dirname, '../public/js'),
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
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.join(__dirname, '../node_modules'),
    ],
  }
}
