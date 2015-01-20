taste
==========

Simple wrapper around testing libraries used by GetHuman. This library would be helpful to anyone
who uses the same testing stack as we do. That includes:

* Mocha
* Chai
* Sinon
* Karma
* Protractor
* Gulp
* Q
* JSHint
* Istanbul

If you don't use all of these, this library won't likely be very helpful for you. If you do, however,
then just include this as a dev dependency and it should save you a lot of keystrokes as well
as unnecessary cruft in your tests.

## Installation

To install simply run the following from the command line in your project root:

```
npm install taste --save-dev
```

Then in the Gulpfile.js that should be in your project root (because you are using Gulp, right?), put this near the top:

```
var gulp    = require('gulp');
var taste   = require('taste');

taste.init({
    gulp:       gulp,
    rootDir:    __dirname + '/lib',
    loadModule: require

    // add other options as well here (see below)
});
```

## Options

* [unit|integration|karma|protractor]TargetCode - Each of these values (ex. karmaTargetCode) contains the gulp file pattern
for all the files that will be tested by the corresponding type of test. So, for example, karmaTargetCode could point to
'dist/js/*.js' which contains all the client side code that is being unit tested by Karma.
* [unit|integration|karma|protractor]TestCode - The actual test code. So, for example, karmaTestCode would contain the Gulp
file pattern for those test files which run the actual Karma tests.
* allCode (default concat of all file patterns passed in) - This is used for jshint as well as watch.

## Gulp

Part of the idea behind this library is that you should be running all testing through Gulp. If you want to run
Mocha or Karma outside of Gulp, you will need to add some additional configuration files into your project.

The taste.init() called in your Gulpfile will automatically add the following tasks:

* jshint - Run with a specific set of options that (sorry) you can't change. This is so you don't need a local .JSHINTRC file.
This will run over the allCode value (i.e. concat of all file paths or the custom value you pass in).
* test & test.integration - Run server side unit and integration tests. The following command line parameters are available for these:
    * --cov=true - This will run test coverage using Istanbul over your code.
    * --files={file pattern} - Instead of doing all tests, you can focus in on one or everyone in a particular directory. For example --files=some/dir
    * --reporter={mocha reporter} - Default is progress
* test.karma - Run karma unit tests
* test.protractor (to be added soon)
* watch - Run server side watches which will re-run jshint and test tasks whenever any files have changed.
* watch.ng - Run karma watch to re-run karma unit tests when any client side code changes.

