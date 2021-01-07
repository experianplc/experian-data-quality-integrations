const path = require('path');

/**
 * Make this production ready:
 * 1. Remove comments
 * 2. Minify code
 */
module.exports = {
  mode: "development",
  // Use 'hidden-source-map' with Webpack and Istanbul for code coverage during testing
  // Use "", which is (none) for a production build
  devtool: "hidden-source-map",
  entry: "src",
  output: {
    libraryTarget: "this"
  },
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
