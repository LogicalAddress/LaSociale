var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;
//jshintConfig: https://github.com/jshint/jshint/blob/master/examples/.jshintrc
jshintConfig.lookup = false;

gulp.task('lint', function() {
    return gulp.src(['libs/*.js', '*.js', 'endpoints/*.js', 'config/*.js', 'cloud/*.js'])
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish, {beep: true}));
});

gulp.task('watch', function() {
    watch(['libs/*.js', '*.js', 'endpoints/*.js', 'config/*.js', 'cloud/*.js'], function(){
    	gulp.start('lint');
    });
});

gulp.task('mocha', function() {
    return gulp.src(['test/bootstrap.js','test/*/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('connect', function() {
  connect.server();
});
gulp.task('disconnect', function() {
  connect.serverClose();
});

gulp.task('test', ['connect','lint','mocha','disconnect']);

// Default Task
gulp.task('default', ['lint', 'watch']);