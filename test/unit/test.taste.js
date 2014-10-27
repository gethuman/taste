/**
 * Author: Jeff Whelpley
 * Date: 10/26/14
 *
 * Testing taste (meta)
 */
var taste = require('../../lib/taste');

describe('UNIT test taste', function () {
    describe('copy()', function () {
        it('should copy an object', function () {
            var obj = { blah: true };
            var obj2 = taste.copy(obj);
            obj2.should.deep.equal(obj);
            obj2.should.not.equal(obj);
        });
    });
});

