/**
 * Author: Jeff Whelpley
 * Date: 10/25/2014
 *
 * This is a wrapper for all libs needed for testing
 */
var Q               = require('q');
var sinon           = require('sinon');
var chai            = require('chai');
var sinonChai       = require('sinon-chai');
var chaiAsPromised  = require('chai-as-promised');
var gulpInit        = require('./gulp.init');
var rootDir, loadModule;

Q.longStackSupport = true;

chai.use(sinonChai);
chai.use(chaiAsPromised);

/**
 * Initialize taste with the input params
 * @param opts
 */
function init(opts) {
    loadModule = opts.loadModule || require;
    rootDir = opts.rootDir || (__dirname + '/../../../');

    if (rootDir.substring(rootDir.length - 1) !== '/') {
        rootDir += '/';
    }

    // if gulp passed in, add a bunch of common tasks
    var gulp = opts.gulp;
    if (gulp) {
        gulpInit(gulp, opts);
    }
}

/**
 * Used to wrap all promises
 * @param promises
 * @param done Optional param if it exists, will do notify at end
 * @returns {*|Promise.<Array.<Object>>}
 */
function all(promises, done) {
    Q.all(promises).should.notify(done);
}

/**
 * Shorthand for just making sure a promise eventually equals a value
 * @param promise
 * @param expected
 * @param done
 */
function eventuallyEqual(promise, expected, done) {
    all([
        promise.should.be.fulfilled,
        promise.should.eventually.deep.equal(expected)
    ], done);
}

/**
 * Shorthand for making sure promise eventually fulfilled
 * @param promise
 * @param done
 */
function eventuallyFulfilled(promise, done) {
    all([
        promise.should.be.fulfilled
    ], done);
}

/**
 * Shorthand for making sure the promise will eventually be rejected
 * @param promise
 * @param done
 */
function eventuallyRejected(promise, done) {
    all([
        promise.should.be.rejected
    ], done);
}

/**
 * Shorthand for making sure the promise will eventually be rejected
 * @param promise
 * @param expected
 * @param done
 */
function eventuallyRejectedWith(promise, expected, done) {
    all([
        promise.should.be.rejectedWith(expected)
    ], done);
}

/**
 * Create copy of an object
 * @param obj
 * @returns {*}
 */
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Convienice method for getting a module
 * @param relativePath
 */
function target(relativePath) {
    return loadModule(rootDir + relativePath);
}

module.exports = {
    init: init,
    all: all,
    eventuallyEqual: eventuallyEqual,
    eventuallyFulfilled: eventuallyFulfilled,
    eventuallyRejected: eventuallyRejected,
    eventuallyRejectedWith: eventuallyRejectedWith,
    copy: copy,
    target: target,

    spy:    sinon.spy,
    expect: chai.expect,
    should: chai.should()
};


