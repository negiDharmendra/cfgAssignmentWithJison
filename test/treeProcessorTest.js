var assert = require('chai').assert;
var expect = require('chai').expect;
var TreeProcessor = require('../src/treeProcessor.js');
var UndefinedIdentifierException = require('../src/customErrors').UndefinedIdentifierException;

var AssignmentNode = require('../src/nodes.js').AssignmentNode;
var OperatorNode = require('../src/nodes.js').OperatorNode;
var NumberNode = require('../src/nodes.js').NumberNode;
var IdentifierNode = require('../src/nodes.js').IdentifierNode;
var SymbolTable = require('../src/symbolTable.js');


describe('TreeProcessor', function () {
    describe('evaluate', function () {
        it('should evaluate the given tree', function () {
            var operatorNode = new OperatorNode('+');
            operatorNode.insertChild(new NumberNode(23));
            operatorNode.insertChild(new NumberNode(23));

            var assignmentNodeA = new AssignmentNode('=');
            assignmentNodeA.insertChild(new IdentifierNode('a'));
            assignmentNodeA.insertChild(operatorNode);


            var assignmentNodeB = new AssignmentNode('=');
            assignmentNodeB.insertChild(new IdentifierNode('f'));
            assignmentNodeB.insertChild(operatorNode);


            var assignmentNodeD = new AssignmentNode('=');
            assignmentNodeD.insertChild(new IdentifierNode('d'));
            assignmentNodeD.insertChild(new NumberNode(4));


            var anotherOperatorNode = new OperatorNode('+');
            anotherOperatorNode.insertChild(new IdentifierNode('a'));
            anotherOperatorNode.insertChild(new IdentifierNode('f'));
            anotherOperatorNode.insertChild(new IdentifierNode('d'));

            var tree = [assignmentNodeA, assignmentNodeB, assignmentNodeD, anotherOperatorNode];
            var actual = new TreeProcessor(tree);
            assert.equal(actual.evaluate(new SymbolTable()), 96);

        });

        it('should throw UndefinedIdentifierException', function () {

            var anotherOperatorNode = new OperatorNode('+');
            anotherOperatorNode.insertChild(new NumberNode(2));
            anotherOperatorNode.insertChild(new NumberNode(4));
            anotherOperatorNode.insertChild(new IdentifierNode('d'));

            var tree = [anotherOperatorNode];
            var actual = new TreeProcessor(tree);
            var expectedToThrow = function () {
                actual.evaluate(new SymbolTable());
            };
            expect(expectedToThrow).to.throw(UndefinedIdentifierException);
            expect(expectedToThrow).to.throw(/Undefined identifier => d/);

        });
    });
});

