var assert = require('chai').assert;

var AssignmentNode = require('../src/nodes.js').AssignmentNode;

var NumberNode = function (value) {
    this.value = value;
    this.type = Number;
    this.evaluate = function () {
        return this.value;
    };
};

describe('AssignmentNode', function () {
    it('should evaluate it self and populate the assignment table', function () {
        var assignmentTable = {};
        var assignmentNode = new AssignmentNode('a');
        assignmentNode.insertChildren(new NumberNode(4));
        assignmentNode.evaluate(assignmentTable);

        assert.deepEqual(assignmentTable,{a:4});
    });
});