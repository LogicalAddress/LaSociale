var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;
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

// Default Task
gulp.task('default', ['lint', 'watch']);