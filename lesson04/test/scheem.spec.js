var expect = require('chai').expect;
var evalScheem = require('../scheem').evalScheem;

suite('operants', function() {
    test('+', function () {
        expect(evalScheem(['+', 1, 2])).to.eql(3);
    });
    test('-', function () {
        expect(evalScheem(['-', 1, 2])).to.eql(-1);
    });
    test('*', function () {
        expect(evalScheem(['*', 2, 3])).to.eql(6);
    });
    test('-', function () {
        expect(evalScheem(['/', 6, 2])).to.eql(3);
    });    
});

suite('quote', function() {
    test('a number', function() {
        expect(
            evalScheem(['quote', 3], {})).
        to.eql(3);
    });
    test('an atom', function() {
        expect(
            evalScheem(['quote', 'dog'], {})).
        to.eql('dog');
    });
    test('a list', function() {
        expect(
            evalScheem(['quote', [1, 2, 3]], {})).
        to.eql([1, 2, 3]);
    });
});
