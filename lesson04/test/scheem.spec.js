"use strict";

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

suite('begin', function () {
    test('last of three numbers is returned', function () {
        var result = evalScheem(['begin', 1, 2, 3]);
        expect(result).to.eql(3);
    });
    test('last expression is returned', function () {
        var result = evalScheem([
            'begin', 
                ['define', 'x', 1],
                ['!set', 'x', 2],
                ['define', 'y', 3],
                ['+', 'x', 'y']
            ]);
        expect(result).to.eql(4);
    });    
});

suite('lists', function() {
    test('cons', function () {
        var result = evalScheem([
            'cons',
                1,
                ['quote', 
                    [2, 3]
                ]
            ]);
        expect(result).
        to.eql([1, 2, 3]);
    });
    test('cons first item is added even if it is a list', function () {
        var result = evalScheem([
            'cons',
                ['quote', 
                    [1, 2]
                ],
                ['quote', 
                    [3, 4]
                ]
            ]);
        expect(result).
        to.eql([[1, 2], 3, 4]);
    }); 
    test('car', function () {
        var result = evalScheem([
            'car',
                ['quote', 
                    [1, 2, 3, 4]
                ]
            ]);
        expect(result).
        to.eql(1);
    });
    test('car with expression as first list element', function () {
        var result = evalScheem([
            'car',
                ['quote', 
                    [[1, 2], 3, 4]
                ]
            ]);
        expect(result).
        to.eql([1, 2]);
    });    
    test('cdr', function () {
        var result = evalScheem([
            'cdr',
                ['quote', 
                    [1, 2, 3, 4]
                ]
            ]);
        expect(result).
        to.eql([2, 3, 4]);
    });    
});