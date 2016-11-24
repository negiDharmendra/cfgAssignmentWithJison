
var AssignmentNode = function (value) {
    this.value = value;
    this.children = [];
};
AssignmentNode.prototype = {

    insertChild: function (child) {
        this.children.push(child);
    },

    evaluate: function (assignmentTable) {
        var identifier = this.children[0];
        var value = this.children[1].evaluate(assignmentTable);
        assignmentTable.populate(identifier, value);
        return value;
    },

    equalTo: function (object) {
        if (!(object instanceof AssignmentNode)) return false;
        if (this.children.length !== object.children.length) return false;
        return isValueEqual.call(this, object) && isChildrenEqual.call(this, object);
    }
};

function isChildrenEqual(object) {
    return this.children.every(function (child, index) {
        return child.equalTo(object.children[index]);
    });
}

function isValueEqual(object) {
    return this.value === object.value;
}

module.exports = AssignmentNode;