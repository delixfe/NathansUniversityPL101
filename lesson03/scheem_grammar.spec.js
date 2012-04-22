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

	it("can parse empty expression", function () {
		var program = "()";
		expect(parse(program)).toEqual([]);
	});

	it("can parse 3 atoms", function () {
		var program = "(a b -)";
		var parsed = parse(program);
		expect(parsed).toEqual(["a", "b", "-"]);
	});

	it("can parse an expression within an expression", function () {
		var program = "(+ (+ 1 2) 3)";
		var parsed = parse(program);
		expect(parsed).toEqual([
				"+", 
				["+", "1", "2"], 
				"3"
			]);
	});

	it("can handle more than one space between atoms", function () {
		var program = "(a     b)";
		var parsed = parse(program);
		expect(parsed).toEqual(["a", "b"]);
	});

	it("can handle more than one space between parentheses", function () {
		var program = " ( a b ) ";
		var parsed = parse(program);
		expect(parsed).toEqual(["a", "b"]);
	});

	it("can handle different whitespaces", function () {
		var program = " (\n \t a \t b \n) ";
		var parsed = parse(program);
		expect(parsed).toEqual(["a", "b"]);
	});

	it("can handle quote special syntax", function () {
		var program = "'(1 2 3)";
		expect(parse(program)).toEqual(["quote", ["1", "2", "3"]]);
	});
});

