var nodes = {};

nodes.AssignmentNode = function (value) {
    this.value = value;
    this.children = [];
};

nodes.AssignmentNode.prototype = {
    insertChildren: function (child) {
        this.children.push(child);
    },
    evaluate: function (assignmentTable) {
        var result = this.children.map(function (child) {
            return child.evaluate();
        });
        assignmentTable[this.value] = result.reduce(function (prevVal, val) {
            return prevVal + val;
        });
    }
};

module.exports = nodes;