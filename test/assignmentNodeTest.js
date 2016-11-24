var expect = require('chai').expect;

var AssignmentNode = require('../src/assignmentNode');
var OperatorNode = require('../src/operatorNode');
var NumberNode = require('../src/numberNode');
var IdentifierNode = require('../src/identifierNode');
var SymbolTable = require('../src/symbolTable');


describe('AssignmentNode', function () {

    describe('equalTo', function () {

        var assignmentNode;
        beforeEach(function () {
            assignmentNode = new AssignmentNode('=');
            assignmentNode.insertChild(new IdentifierNode('a'));
            assignmentNode.insertChild(new NumberNode(4));
        });

        it('should return true when object are of similar type with similar children', function () {

            var assignmentNode1 = new AssignmentNode('=');
            assignmentNode1.insertChild(new IdentifierNode('a'));
            assignmentNode1.insertChild(new NumberNode(4));

            expect(assignmentNode.equalTo(assignmentNode1)).to.be.equal(true);

        });

        it('should return false when object are of dissimilar type with similar children', function () {

            var operatorNode = new OperatorNode('+');
            operatorNode.insertChild(new NumberNode(4));

            expect(assignmentNode.equalTo(operatorNode)).to.equal(false);

        });

        it('should return false when objects are of similar type with dissimilar children', function () {

            var assignmentNode1 = new AssignmentNode('=');
            assignmentNode1.insertChild(new IdentifierNode('a'));
            assignmentNode1.insertChild(new NumberNode(6));

            expect(assignmentNode.equalTo(assignmentNode1)).to.equal(false);

        });

    });

    describe('evaluate', function () {

        var symbolTable;
        var assignmentNode;
        beforeEach(function () {
            symbolTable = new SymbolTable();
            assignmentNode = new AssignmentNode('=');
            assignmentNode.insertChild(new IdentifierNode('a'));
            assignmentNode.insertChild(new NumberNode(4));
        });

        it('should evaluate it self and populate the assignment table', function () {
            assignmentNode.evaluate(symbolTable);

            var expectedAssignmentTable = {a: 4};
            expect(symbolTable.table).to.be.deep.equal(expectedAssignmentTable);
        });

        it('should evaluate it self when children are of AssignmentNode type', function () {
            var assignmentNode = new AssignmentNode('=');
            assignmentNode.insertChild(new IdentifierNode('a'));

            var assignmentNode2 = new AssignmentNode();
            assignmentNode2.insertChild(new IdentifierNode('b'));
            assignmentNode2.insertChild(new NumberNode(4));

            assignmentNode.insertChild(assignmentNode2);
            assignmentNode.evaluate(symbolTable);

            var expectedAssignmentTable = {a: 4, b: 4};
            expect(symbolTable.table).to.be.deep.equal(expectedAssignmentTable);
        });

    });

});
