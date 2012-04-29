var expect = require('chai').expect;
var evalScheem = require('../scheem').evalScheem;


suite('second parameter can be ommited', function () {
    test('call only one parameter', function() {
        expect(
            evalScheem(1)).
        to.eql(1);
    });
});

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

suite('define and set!', function () {
    test('define', function () {
        var env = {};
        evalScheem(['define', 'a', 5], env);
        expect(env.a).to.eql(5);
    });
    test('define', function () {
        var env = {};
        var result = evalScheem(['define', 'a', 5], env);
        expect(env.a).to.eql(5);
        expect(result).to.eql(0);
    }); 
    test('set! number', function () {
        var env = { a: 5 };
        var result = evalScheem(['set!', 'a', 1], env);
        expect(env.a).to.eql(1);
        expect(result).to.eql(0);
    });       
    test('set! expression', function () {
        var env = { a: 0, x: 1 };
        var result = evalScheem(['set!', 'a', ['+', 'x', 2]], env);
        expect(env.a).to.eql(3);
        expect(result).to.eql(0);
    });    
});