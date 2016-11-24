var expect = require('chai').expect;

var IdentifierNode = require('../src/identifierNode');
var SymbolTable = require('../src/symbolTable');
var UndefinedIdentifierException = require('../src/customErrors').UndefinedIdentifierException;

describe('IdentifierNode', function () {
    describe('equalTo', function () {
        it('should return true object is of similar type with similar value', function () {
            var identifierNode = new IdentifierNode('a');
            var identifierNode1 = new IdentifierNode('a');
            expect(identifierNode.equalTo(identifierNode1)).to.be.equal(true);
        });

        it('should return false object is of dissimilar type with similar value', function () {
            var identifierNode = new IdentifierNode('a');
            var identifierNode1 = new Object('a');
            expect(identifierNode.equalTo(identifierNode1)).to.equal(false);
        });

        it('should return false object is of similar type with dissimilar value', function () {
            var identifierNode = new IdentifierNode('a');
            var identifierNode1 = new IdentifierNode('b');
            expect(identifierNode.equalTo(identifierNode1)).to.equal(false);
        });
    });


    describe('evaluate', function () {

        var identifierNode;
        var symbolTable;
        beforeEach(function () {
            identifierNode = new IdentifierNode('a');
            symbolTable = new SymbolTable();
        });

        it('should evaluate it self', function () {
            symbolTable.populate('a', 23);
            var actual = identifierNode.evaluate(symbolTable);
            expect(actual, 'to equal', 23);
        });

        it('should throw UndefinedIdentifierException', function () {
            symbolTable.populate('b', 23);
            var evaluate = function () {
                identifierNode.evaluate(symbolTable);
            };
            expect(evaluate).to.throw(UndefinedIdentifierException);
            expect(evaluate).to.throw(/Undefined identifier => a/);
        });
    });
});