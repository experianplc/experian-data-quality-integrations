var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var exec = require('child_process').exec;
var pjson = require('../package.json');

gulp.task('default', function(done) {
  var mode = "development";
  if (process.env.NODE_ENV) {
    mode = process.env.NODE_ENV;
  }

  let version = pjson.version;
  command(`webpack --mode=${mode} --config ${path.join(__dirname, 'verification-webpack.js')}`);
  command(`webpack --mode=${mode} --config ${path.join(__dirname, 'typedown-webpack.js')}`);
  command(`webpack --mode=${mode} --config ${path.join(__dirname, 'email-webpack.js')}`);
  command(`webpack --mode=${mode} --config ${path.join(__dirname, 'phone-webpack.js')}`);
  command(`webpack --mode=${mode} --config ${path.join(__dirname, 'global-intuitive-webpack.js')}`);

  // TODO: This is kind of hacky since these are hard-coded values and this has little to do with
  // Gulp, however for the sake of getting this done quickly we'll leave it.
  command(`cp -v ${path.join(__dirname, "../dist/verification-unicorn.js")} ${path.join(__dirname, "../dist-v/verification-unicorn-v" + version + ".js")}`);
  command(`cp -v ${path.join(__dirname, "../dist/email-unicorn.js")} ${path.join(__dirname, "../dist-v/email-unicorn-v" + version + ".js")}`);
  command(`cp -v ${path.join(__dirname, "../dist/global-intuitive-unicorn.js")} ${path.join(__dirname, "../dist-v/global-intuitive-unicorn-v" + version + ".js")}`);
  command(`cp -v ${path.join(__dirname, "../dist/phone-unicorn.js")} ${path.join(__dirname, "../dist-v/phone-unicorn-v" + version + ".js")}`);
  command(`cp -v ${path.join(__dirname, "../dist/typedown-single-line-unicorn.js")} ${path.join(__dirname, "../dist-v/typedown-single-line-unicorn-v" + version + ".js")}`);
  done();
});

function command(commandToBeRun) {
  exec(commandToBeRun, function(e, o, se) {
    console.log(o);
  });
}
