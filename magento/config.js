const path = require('path');

/**
 * Make this production ready:
 * 1. Remove comments
 * 2. Minify code
 */
module.exports = {
  mode: "development",
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "../utils")
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve("ts-loader"),
        exclude: /node_modules/
      }
    ]
  }
}
