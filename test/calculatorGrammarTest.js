var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var grammar = fs.readFileSync('./src/calculatorGrammar.jison', 'utf-8');

var Parser = require('jison').Parser;
var parser = new Parser(grammar);

describe('calculator grammar', function () {
        it("should represent 1+2 as ['+',1,2]", function () {
            var actual = parser.parse('1+2');
            var expected = ['+', 1, 2];
            assert.deepEqual(actual, expected)
        });

        it("should represent 1+2+3 as ['+', ['+', 1, 2], 3]", function () {
            var actual = parser.parse('1+2+3');
            var expected = ['+', ['+', 1, 2], 3];
            assert.deepEqual(actual, expected);
        });

        it("should represent 1*2 as ['*', 1, 2]", function () {
            var actual = parser.parse('1*2');
            var expected = ['*', 1, 2];
            assert.deepEqual(actual, expected);
        });

        it("should represent 1*2*3 as ['*', ['*', 1, 2], 3]", function () {
            var actual = parser.parse('1*2*3');
            var expected = ['*', ['*', 1, 2], 3];
            assert.deepEqual(actual, expected);
        });


        it("should represent 1+2*3 as ['+', 1, ['*', 2, 3]]", function () {
            var actual = parser.parse('1+2*3');
            var expected = ['+', 1, ['*', 2, 3]];
            assert.deepEqual(actual, expected);
        });


        it("should represent 1000000000*2000000 as ['*', 1000000000, 2000000]", function () {
            var actual = parser.parse('1000000000*2000000');
            var expected = ['*', 1000000000, 2000000];
            assert.deepEqual(actual, expected);
        });

        it("should represent 3^2; as ['^', 3, 2]", function () {
            var actual = parser.parse('3^2');
            var expected = ['^', 3, 2];
            assert.deepEqual(actual, expected);
        });

        it("should represent a=2; as ['=', 'a', 2]", function () {
            var actual = parser.parse('a=2;');
            var expected = ['=', 'a', 2];
            assert.deepEqual(actual, expected);
        });

        it("should represent a=5;2+4 as [['=', 'a', 2],['+',4,5]]", function () {
            var actual = parser.parse('a=5;2+4');
            var expected = [['=', 'a', 5],['+',2,4]];
            assert.deepEqual(actual, expected);
        });

        it("should represent a=5;a+4 as [['=', 'a', 2],['+',a,5]]", function () {
            var actual = parser.parse('a=5;a+4');
            var expected = [['=', 'a', 5],['+','a',4]];
            assert.deepEqual(actual, expected);
        });

        it.skip("should represent a=v=2; as ['=', 'a', ['=', 'v', 2]]", function () {
            var actual = parser.parse('a=v=2;');
            var expected = ['=', 'a', ['=', 'v', 2]];
            assert.deepEqual(actual, expected);
        });

        it.skip("should represent a=v=c=2; as ['=', 'a', ['=', 'v', 2]]", function () {
            var actual = parser.parse('a=v=c=2;');
            var expected = ['=', 'a', ['=', 'v', ['=','c',2]]];
            assert.deepEqual(actual, expected);
        });

        it("should represent a=3;b=2; as [['=', 'a', 3],['=','b',2]]", function () {
            var actual = parser.parse('a=3;b=2;');
            var expected = [['=', 'a', 3],['=','b',2]];
            assert.deepEqual(actual, expected);
        });

        it.skip("should represent a=c=3;b=2; as [['=', 'a', 3],['=','b',2]]", function () {
            var actual = parser.parse('a=c=3;b=2;');
            var expected = [['=', 'a', ['=', 'c', 3]],['=','b',2]];
            assert.deepEqual(actual, expected);
        });

        it("should represent a=2+3; as ['=', 'a', ['+', 2, 3]]", function () {
            var actual = parser.parse('a=2+3;');
            var expected = ['=', 'a', ['+', 2, 3]];
            assert.deepEqual(actual, expected);
        });

        it("should be able to generate tree for a=23+23;f=4+4;d=4;d=4+45;", function () {
            var actual = parser.parse('a=23+23;f=4+4;d=4;d=4+45;');
            var expected = [ [ '=', 'a', [ '+', 23, 23 ] ],[ '=', 'f', [ '+', 4, 4 ] ],[ '=', 'd', 4 ],[ '=', 'd', [ '+', 4, 45 ] ] ];
            assert.deepEqual(actual, expected);
        });
});

