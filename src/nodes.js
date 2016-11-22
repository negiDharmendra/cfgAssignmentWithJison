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
        var child = this.children[0];
        if(child instanceof nodes.AssignmentNode) {
            child.evaluate(assignmentTable);
            assignmentTable[this.value] = child.value;
        }
        else
            assignmentTable[this.value] = child.evaluate(assignmentTable);
    }
};

module.exports = nodes;