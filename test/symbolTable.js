var expect = require('unexpected');
var SymbolTable = require('../src/symbolTable.js');
var IdentifierNode = require('../src/identifierNode');
var NumberNode = require('../src/numberNode');

describe('SymbolTable', function () {

    describe('equalTo', function () {

        var symbolTable;
        beforeEach(function () {
            symbolTable = new SymbolTable();
            symbolTable.populate(new IdentifierNode('a'), new NumberNode(23));
            symbolTable.populate(new IdentifierNode('b'), new NumberNode(24));
        });

        it('should be equal to it self with similar value', function () {
            expect(symbolTable.equalTo(symbolTable), 'to equal', true);
        });

        it('should be equal to another assignment table with similar values', function () {
            var anotherSymbolTable = new SymbolTable();
            anotherSymbolTable.populate(new IdentifierNode('a'), new NumberNode(23));
            anotherSymbolTable.populate(new IdentifierNode('b'), new NumberNode(24));

            expect(symbolTable.equalTo(anotherSymbolTable), 'to equal', true);
        });


        it('should not be equal to another assignment table with different values', function () {
            var anotherSymbolTable = new SymbolTable();
            anotherSymbolTable.populate('a', new NumberNode(25));
            anotherSymbolTable.populate('b', new NumberNode(24));

            expect(symbolTable.equalTo(anotherSymbolTable), 'to equal', false);
        });

        it('should not be equal to other type of object with similar values', function () {
            symbolTable.populate('a', 23);
            symbolTable.populate('b', 24);

            var anotherSymbolTable = {a: 23, b: 24};

            expect(symbolTable.equalTo(anotherSymbolTable), 'to equal', false);
        });

    });

    describe('getValueOf', function () {

        var symbolTable;
        beforeEach(function () {
            symbolTable = new SymbolTable();
            symbolTable.populate(new IdentifierNode('a'), new NumberNode(23));
            symbolTable.populate(new IdentifierNode('c'), new NumberNode(2));
            symbolTable.populate(new IdentifierNode('b'), new IdentifierNode('c'));
            symbolTable.populate(new IdentifierNode('d'), new IdentifierNode('e'));
        });

        it('should return value of given key', function () {
            var expected = new NumberNode(23);
            var actual = symbolTable.getValueOf(new IdentifierNode('a'));

            expect(actual.value, 'to equal', expected.value);
        });

    });
});