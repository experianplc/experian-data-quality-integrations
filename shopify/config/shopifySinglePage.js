const path = require('path');

module.exports = {
  mode: "development",
  entry: '../src/shopifySinglePage.ts',
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, '../lib/shopifySinglePage'),
    library: ["Shopify", "shopifySinglePage"],
    filename: 'shopifySinglePage.js',
    publicPath: '../lib/shopifySinglePage'
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
