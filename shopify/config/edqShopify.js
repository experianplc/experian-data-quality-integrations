const path = require('path');

module.exports = {
  mode: "development",
  entry: '../src/edqShopify.ts',
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, '../lib/edqShopify'),
    library: ["Shopify", "edqShopify"],
    filename: 'edqShopify.js',
    publicPath: '../lib/edqShopify'
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
