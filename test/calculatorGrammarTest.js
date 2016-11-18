var expect  = require('chai').expect;
var fs = require('fs');
var grammar = fs.readFileSync('./src/calculatorGrammar.jison','utf-8');

var Parser = require('jison').Parser;
var parser = new Parser(grammar);

describe('calculator grammar', function () {
    describe('toString',function(){
        it("should represent 1+2 as (one plus two)", function () {
            var actual = parser.parse('1+2');
            var expected = '(one plus two)';
            expect(actual.toString()).to.be.equal(expected)
        });

        it("should represent 1+2+3 as ((one plus two) plus three)", function () {
            var actual = parser.parse('1+2+3');
            var expected = '((one plus two) plus three)';
            expect(actual.toString()).to.be.equal(expected)
        });

        it("should represent 1*2 as (one times two)", function () {
            var actual = parser.parse('1*2');
            var expected = '(one times two)';
            expect(actual.toString()).to.be.equal(expected)
        });

        it("should represent 1*2*3 as ((one times two) times three)", function () {
            var actual = parser.parse('1*2*3');
            var expected = '((one times two) times three)';
            expect(actual.toString()).to.be.equal(expected)
        });


        it("should represent 1+2*3 as (one plus (two times three))", function () {
            var actual = parser.parse('1+2*3');
            var expected = '(one plus (two times three))';
            expect(actual.toString()).to.be.equal(expected)
        });


        it("should represent 1000000000*2000000 as (one billion times two million)", function () {
            var actual = parser.parse('1000000000*2000000');
            var expected = '(one billion times two million)';
            expect(actual.toString()).to.be.equal(expected)
        });
    });

});