/**
 * Author: Jeff Whelpley
 * Date: 10/25/14
 *
 * Initialize gulp with common tasks
 */
var _           = require('lodash');
var jshint      = require('gulp-jshint');
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');
var karma       = require('karma').server;

// initialize given gulp
module.exports = function (gulp, opts) {
    var karamTargetCode =   opts.karmaTargetCode || 'dist/js/*.js';
    var karmaTestCode =     opts.karmaTestCode || 'test/karma/**/*.js';
    var karmaCode =         [karamTargetCode, karmaTestCode];
    var unitTargetCode =    opts.unitTargetCode || 'lib/**/*.js';
    var unitTestCode =      opts.unitTestCode || 'test/unit/**/*.js';
    var intTargetCode =     opts.intTargetCode || 'lib/**/*.js';
    var intTestCode =       opts.intTestCode || 'test/integration/**/*.js';
    var allCode =           opts.allCode || [karmaTestCode, unitTargetCode, unitTestCode, intTargetCode, intTestCode];

    // config for all karam runs
    var karmaConfig = {
        port:               9201,
        runnerPort:         9301,
        captureTimeout:     20000,
        growl:              true,
        colors:             true,
        browsers:           ['PhantomJS'],
        reporters:          ['progress', 'coverage'],
        frameworks:         ['mocha', 'sinon-chai'],
        preprocessors:      {},
        coverageReporter:   { type: 'text-summary', dir: 'test/coverage/' },
        files:              karmaCode
    };

    // linting
    gulp.task('jshint', function () {
        return gulp.src(allCode)
            .pipe(jshint({
                'node': true,
                'esnext': true,
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'indent': 4,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'quotmark': 'single',
                'regexp': true,
                'undef': true,
                'unused': true,
                'strict': false,
                'trailing': true,
                'smarttabs': true,
                'white': true,
                'expr': true,
                'globals': {
                    'angular': true,
                    'describe': true,
                    'it': true,
                    'before': true,
                    'after': true,
                    'beforeEach': true,
                    'afterEach': true,
                    'inject': true
                }
            }))
            .pipe(jshint.reporter('default'));
    });

    // run unit tests
    gulp.task('test', function (done) {
        if (opts.isCov) {
            gulp.src(unitTargetCode)
                .pipe(istanbul())
                .on('finish', function () {
                    gulp.src(unitTestCode)
                        .pipe(mocha({
                            growl: true,
                            ui: 'bdd',
                            reporter: 'progress',
                            timeout: 5000
                        }))
                        .pipe(istanbul.writeReports({
                            dir: './test/coverage',
                            reportOpts: { dir: './test/coverage' }
                        }))
                        .on('end', done);
                });
        }
        else {
            gulp.src(unitTestCode)
                .pipe(mocha({
                    growl: true,
                    ui: 'bdd',
                    reporter: 'progress',
                    timeout: 5000
                }))
                .on('end', done);
        }
    });

    // run integration tests
    gulp.task('test.integration', function (done) {
        if (opts.isCov) {
            gulp.src(intTargetCode)
                .pipe(istanbul())
                .on('finish', function () {
                    gulp.src(intTestCode)
                        .pipe(mocha({
                            growl: true,
                            ui: 'bdd',
                            reporter: 'progress',
                            timeout: 5000
                        }))
                        .pipe(istanbul.writeReports({
                            dir: './test/coverage',
                            reportOpts: { dir: './test/coverage' }
                        }))
                        .on('end', done);
                });
        }
        else {
            gulp.src(intTestCode)
                .pipe(mocha({
                    growl: true,
                    ui: 'bdd',
                    reporter: 'progress',
                    timeout: 5000
                }))
                .on('end', done);
        }
    });

    // run karma tests
    gulp.task('test.karma', function (done) {
        var config = _.extend({
            singleRun:  true,
            autoWatch:  false
        }, karmaConfig);

        if (opts.isCov) {
            config.preprocessors[clientCoverage] = 'coverage';
        }

        karma.start(config, done);
    });

    // watch the server code
    gulp.task('watch', function () {
        gulp.watch(allCode, ['jshint', 'test']);
    });

    // watch the client side code
    gulp.task('watch.ng', function (done) {
        var config = _.extend({
            singleRun:  false,
            autoWatch:  true
        }, karmaConfig);

        if (opts.isCov) {
            config.preprocessors[clientCoverage] = 'coverage';
        }

        karma.start(config, done);
    });
};