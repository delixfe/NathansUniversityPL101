var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

var grammar = fs.readFileSync('scheem.pegjs', 'ascii');


describe("create scheem parser", function () {
	it("can has loaded the grammar file", function () {
		expect(grammar).toContain("expression");
	});

	it("can build the parser", function () {
		PEG.buildParser(grammar).parse;
	});

	
});

describe("scheem grammar tests", function () {
	
	var parse = PEG.buildParser(grammar).parse;

	it("can parse an atom", function () {
		var program = "+";
		expect(parse(program)).toEqual("+");
	});

	it("can parse empty expresssion", function () {
		var program = "()";
		expect(parse(program)).toEqual([]);
	});
});

