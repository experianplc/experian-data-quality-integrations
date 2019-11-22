const path = require('path');

module.exports = {
  mode: "development",
  entry: "../src/verification-unicorn.ts",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'verification-unicorn.js',
    publicPath: '../lib/'
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
}
