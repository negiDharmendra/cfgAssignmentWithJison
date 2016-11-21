var assert = require('chai').assert;
var treeProcessor = require('../src/treeProcessor.js');
var fs = require('fs');
var grammar = fs.readFileSync('./src/calculatorGrammar.jison', 'utf-8');

var Parser = require('jison').Parser;
var parser = new Parser(grammar);

describe('treeProcessor', function () {
    it("should represent 1+2 as [ plus,1,2]", function () {
        var actual = treeProcessor(parser.parse('1+2;'));
        var expected = '( plus one two )';
        assert.deepEqual(actual.trim(), expected)
    });

    it("should represent 1+2+3 as [ plus, [ plus, 1, 2], 3]", function () {
        var actual = treeProcessor(parser.parse('1+2+3;'));
        var expected = '( plus ( plus one two ) three )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent 1*2 as [ times 1, 2]", function () {
        var actual = treeProcessor(parser.parse('1*2;'));
        var expected = '( times one two )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent 1*2*3 as [ times [ times 1, 2], 3]", function () {
        var actual = treeProcessor(parser.parse('1*2*3;'));
        var expected = '( times ( times one two ) three )';
        assert.deepEqual(actual.trim(), expected);
    });


    it("should represent 1+2*3 as [ plus, 1, [ times 2, 3]]", function () {
        var actual = treeProcessor(parser.parse('1+2*3;'));
        var expected = '( plus one ( times two three ) )';
        assert.deepEqual(actual.trim(), expected);
    });


    it("should represent 1000000000*2000000 as [ times 1000000000, 2000000]", function () {
        var actual = treeProcessor(parser.parse('1000000000*2000000;'));
        var expected = '( times one-billion two-million )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent 3^2; as [ pow, 3, 2]", function () {
        var actual = treeProcessor(parser.parse('3^2;'));
        var expected = '( pow three two )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent a=2; as [ equal 'a', 2]", function () {
        var actual = treeProcessor(parser.parse('a=2;'));
        var expected = '( equal a two )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent a=5;2+4 as [[ equal 'a', 2],[ plus,4,5]]", function () {
        var actual = treeProcessor(parser.parse('a=5;2+4;'));
        var expected = '( ( equal a five ) ( plus two four ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent a=5;a+4 as [[ equal 'a', 2],[ plus,a,5]]", function () {
        var actual = treeProcessor(parser.parse('a=5;a+4;'));
        var expected = '( ( equal a five ) ( plus a four ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it.skip("should represent a=v=2; as [ equal 'a', [ equal 'v', 2]]", function () {
        var actual = treeProcessor(parser.parse('a=v=2;'));
        var expected = '( equal a ( equal v two ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it.skip("should represent a=v=c=2; as [ equal 'a', [ equal 'v', 2]]", function () {
        var actual = treeProcessor(parser.parse('a=v=c=2;'));
        var expected = '( equal a ( equal v ( equal c two ) ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent a=3;b=2; as [[ equal 'a', 3],[ equal'b',2]]", function () {
        var actual = treeProcessor(parser.parse('a=3;b=2;'));
        var expected = '( ( equal a three ) ( equal b two ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it.skip("should represent a=c=3;b=2; as [[ equal 'a', 3],[ equal'b',2]]", function () {
        var actual = treeProcessor(parser.parse('a=c=3;b=2;'));
        var expected = '( ( equal a ( equal v two ) ) ( equal two ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should represent a=2+3; as [ equal 'a', [ plus, 2, 3]]", function () {
        var actual = treeProcessor(parser.parse('a=2+3;'));
        var expected = '( equal a ( plus two three ) )';
        assert.deepEqual(actual.trim(), expected);
    });

    it("should be able to generate tree for a=23+23;f=4+4;d=4;d=4+45;", function () {
        var actual = treeProcessor(parser.parse('a=23+23;f=4+4;d=4;d=4+45;'));
        var expected = '( ( equal a ( plus twenty-three twenty-three ) ) ( equal f ( plus four four ) ) ( equal d four ) ( equal d ( plus four forty-five ) ) )';
        assert.deepEqual(actual.trim(), expected);
    });
});

