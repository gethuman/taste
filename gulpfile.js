/**
 * Author: Jeff Whelpley
 * Date: 2/9/14
 *
 * Build file for Pancakes
 */
var gulp    = require('gulp');
var argv    = require('yargs').argv;
var taste   = require('./lib/taste');

//initialize taste
taste.init({
    gulp:       gulp,
    rootDir:    __dirname,
    loadModule: require,
    isCov:      argv.cov
});

gulp.task('default', ['jshint', 'test']);


