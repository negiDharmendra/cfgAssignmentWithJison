var expect = require('unexpected');

var AssignmentNode = require('../src/nodes.js').AssignmentNode;

var NumberNode = function (value) {
    this.value = value;
    this.evaluate = function () {
        return this.value;
    };
};

describe('AssignmentNode', function () {
    var assignmentTable;
    var assignmentNode;
    beforeEach(function () {
        assignmentTable = {};
        assignmentNode = new AssignmentNode('a');
    });

    it('should evaluate it self and populate the assignment table', function () {
        assignmentNode.insertChildren(new NumberNode(4));
        assignmentNode.evaluate(assignmentTable);

        var expectedAssignmentTable = {a: 4};
        expect(assignmentTable, 'to equal', expectedAssignmentTable);
    });

    it('should evaluate it self when children are of AssignmentNode type', function () {
        var assignmentNode2 = new AssignmentNode('b');
        assignmentNode2.insertChildren(new NumberNode(4));
        assignmentNode.insertChildren(assignmentNode2);
        assignmentNode.evaluate(assignmentTable);

        var expectedAssignmentTable = {a: 'b', b: 4};
        expect(assignmentTable, 'to equal', expectedAssignmentTable);
    });
});