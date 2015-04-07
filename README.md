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
// in your gulp file or mocha init file (depending on how you run your tests)
var taste = require('taste');
taste.firstBite('../path/to/root/dir');

// in each test spec file
var taste = require('taste');
describe('something to test', function () {
    it('should do something', function () {
        taste.should.exist(blah);
        var fn = taste.spy();
        // etc.
    });
});

## API

The taste object has the following functions that you can use in your test spec:
 
* spy - Exposed sinon.spy
* expect - Exposed chai.expect
* should - Exposed chai.should()
* firstByte - To set the root dir for the app
* all - Does a Q.all() and then calls the mocha done() function once everything has resolved
* eventuallyEqual, eventuallyFulfilled, eventuallyRejected, eventuallyRejectedWith - Extra sugar on top of chai-as-promised
* copy - Copy an object
* target - Do require to get a module to be tested without using relative path (go from project root)