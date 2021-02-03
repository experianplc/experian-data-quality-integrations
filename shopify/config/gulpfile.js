var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var exec = require('child_process').exec;

gulp.task('default', function(done) {
  var mode = process.env.NODE_ENV || "development";

  // Shopify
  command(`webpack --config ${path.join(__dirname, 'edqShopify.js')}`);
  
  command(`webpack --config ${path.join(__dirname, 'shopifySinglePage.js')}`);
  done();
});

function command(commandToBeRun) {
  exec(commandToBeRun, function(e, o, se) {
    console.log(o);
  });
}
