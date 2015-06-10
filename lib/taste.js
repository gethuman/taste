/**
 * Author: Jeff Whelpley
 * Date: 10/25/2014
 *
 * This is a wrapper for all libs needed for testing
 */
var _               = require('lodash');
var Q               = require('q');
var sinon           = require('sinon');
var chai            = require('chai');
var sinonChai       = require('sinon-chai');
var chaiAsPromised  = require('chai-as-promised');
var path            = require('path');
var argv            = require('yargs').argv;
var targetDir;

Q.longStackSupport = true;

chai.use(sinonChai);
chai.use(chaiAsPromised);
//chai.config.truncateThreshold = 0;

/**
 * Initialize taste with the input params
 * @param dir
 */
function firstBite(dir) {
    targetDir = dir || (__dirname + '/../../..');

    if (targetDir.substring(targetDir.length - 1) === '/') {
        targetDir = targetDir.substring(0, targetDir.length - 1);
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
    return require(targetDir + '/' + relativePath);
}

/**
 * Add command line arguments to a given object
 * @param obj
 */
function addCommandLineArgs(obj) {
    _.extend(obj, argv);
    delete obj.$0;
    delete obj._;
}

module.exports = {
    delim: path.normalize('/'),
    firstBite: firstBite,
    all: all,
    eventuallyEqual: eventuallyEqual,
    eventuallyFulfilled: eventuallyFulfilled,
    eventuallyRejected: eventuallyRejected,
    eventuallyRejectedWith: eventuallyRejectedWith,
    copy: copy,
    target: target,
    addCommandLineArgs: addCommandLineArgs,

    spy:    sinon.spy,
    stub:   sinon.stub,
    expect: chai.expect,
    should: chai.should()
};


