var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var spawn = require('child_process').spawn;

var node;

gulp.task('hello', () => {
  console.log("Hello world");
});

gulp.task("frontend", function () {
  return gulp.src("src/index.js")
    .pipe(babel())
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest("dist"));
});

gulp.task("backend", ['frontend'], function () {
  return gulp.src("backend/*.js")
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest("backdist"));
});

gulp.task('server', ['frontend', 'backend'], function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['backdist/server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});


gulp.task('default', function(){
  gulp.run(['server']);
  gulp.watch(['backend/**/*.*', 'src/**/*.*'], function() {
    gulp.run(['server']);
  });
});

process.on('exit', function(){
  if(node){
    node.kill();
  }
});
