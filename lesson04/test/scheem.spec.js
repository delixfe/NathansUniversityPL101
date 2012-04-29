var expect = require('chai').expect;
var evalScheem = require('../scheem').evalScheem;

suite('operants', function() {
    test('+', function () {
        expect(evalScheem(['+', 1, 2])).to.equal(3);
    });
    test('-', function () {
        expect(evalScheem(['-', 1, 2])).to.equal(-1);
    });
    test('*', function () {
        expect(evalScheem(['*', 2, 3])).to.equal(6);
    });
    test('-', function () {
        expect(evalScheem(['/', 6, 2])).to.equal(3);
    });    
});

suite('quote', function() {
    test('a number', function() {
        expect(evalScheem(['quote', 3], {})).to.equal(3);
    });
    test('an atom', function() {
        assert.deepEqual(
            evalScheem(['quote', 'dog'], {}),
            'dog'
        );
    });
    test('a list', function() {
        assert.deepEqual(
            evalScheem(['quote', [1, 2, 3]], {}),
            [1, 2, 3]
        );
    });
});
