var expect = require('unexpected');

var AssignmentNode = require('../src/nodes.js').AssignmentNode;
var OperatorNode = require('../src/nodes.js').OperatorNode;
var NumberNode = require('../src/nodes.js').NumberNode;

describe('Nodes', function () {
    describe('AssignmentNode', function () {

        var assignmentTable;
        var assignmentNode;
        beforeEach(function () {
            assignmentTable = {};
            assignmentNode = new AssignmentNode('a');
        });

        it('should evaluate it self and populate the assignment table', function () {
            assignmentNode.insertChild(new NumberNode(4));
            assignmentNode.evaluate(assignmentTable);

            var expectedAssignmentTable = {a: 4};
            expect(assignmentTable, 'to equal', expectedAssignmentTable);
        });

        it('should evaluate it self when children are of AssignmentNode type', function () {
            var assignmentNode2 = new AssignmentNode('b');
            assignmentNode2.insertChild(new NumberNode(4));
            assignmentNode.insertChild(assignmentNode2);
            assignmentNode.evaluate(assignmentTable);

            var expectedAssignmentTable = {a: 'b', b: 4};
            expect(assignmentTable, 'to equal', expectedAssignmentTable);
        });
    });

    describe('OperatorNode', function () {

        describe(' + operator', function () {

            var assignmentTable;
            var operatorNode;
            beforeEach(function () {
                assignmentTable = {};
                operatorNode = new OperatorNode('+');

            });

            it('should evaluate it self', function () {
                operatorNode.insertChild(new NumberNode(4));
                operatorNode.insertChild(new NumberNode(5));

                expect(operatorNode.evaluate(), 'to equal', 9);
            });

        });

        describe(' - operator', function () {

            it('should evaluate it self', function () {
                var operatorNode = new OperatorNode('-');
                operatorNode.insertChild(new NumberNode(4));
                operatorNode.insertChild(new NumberNode(5));

                expect(operatorNode.evaluate(), 'to equal', -1);
            });

        });

        describe(' * operator', function () {

            it('should evaluate it self', function () {
                var operatorNode = new OperatorNode('*');
                operatorNode.insertChild(new NumberNode(4));
                operatorNode.insertChild(new NumberNode(5));

                expect(operatorNode.evaluate(), 'to equal', 20);
            });

        });

        describe(' / operator', function () {

            it('should evaluate it self', function () {
                var operatorNode = new OperatorNode('/');
                operatorNode.insertChild(new NumberNode(40));
                operatorNode.insertChild(new NumberNode(20));
                operatorNode.insertChild(new NumberNode(2));

                expect(operatorNode.evaluate(), 'to equal', 1);
            });

        });

        describe(' ^ operator', function () {

            it('should evaluate it self', function () {
                var operatorNode = new OperatorNode('^');
                operatorNode.insertChild(new NumberNode(3));
                operatorNode.insertChild(new NumberNode(3));
                operatorNode.insertChild(new NumberNode(2));

                expect(operatorNode.evaluate(), 'to equal', 19683);
            });

        });
    });

});
