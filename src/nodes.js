var nodes = {};
var operators = {};

nodes.NumberNode = function (value) {
    this.value = value;
};

nodes.NumberNode.prototype = {
    evaluate: function () {
        return this.value;
    },
    equalTo: function (object) {
        return this.value === object.value;
    }
};


nodes.IdentifierNode = function (value) {
    this.value = value;
};

nodes.IdentifierNode.prototype = {
    evaluate: function (assignmentTable) {
        return assignmentTable[this.value];
    },
    equalTo: function (object) {
        return this.value === object.value;
    }
};


nodes.AssignmentNode = function (value) {
    this.value = value;
    this.children = [];
};


nodes.AssignmentNode.prototype = {

    insertChild: function (child) {
        this.children.push(child);
    },

    evaluate: function (assignmentTable) {
        var identifier = this.children[0].value;
        var valueNode = this.children[1];

        if (valueNode instanceof nodes.AssignmentNode) {
            valueNode.evaluate(assignmentTable);
            assignmentTable[identifier] = valueNode.children[0].value;
        }
        else
            assignmentTable[identifier] = valueNode.evaluate();
    },

    equalTo: function (object) {
        if (!(object instanceof nodes.AssignmentNode)) return false;
        if (this.children.length !== object.children.length) return false;
        return isValueEqual.call(this, object) && isChildrenEqual.call(this, object);
    }
};

nodes.OperatorNode = function (value) {
    this.value = value;
    this.children = [];
};

nodes.OperatorNode.prototype = {

    insertChild: function (child) {
        this.children.push(child);
    },

    evaluate: function () {
        return operators[this.value].apply(this).value;
    },

    equalTo: function (object) {
        if (!(object instanceof nodes.OperatorNode)) return false;
        if (!isValueEqual.call(this, object)) return false;
        if (this.children.length !== object.children.length) return false;
        return isChildrenEqual.call(this, object);
    }
};

operators = {

    '+': function () {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate() + currentVal.evaluate();
            return new nodes.NumberNode(out);
        });
    },

    '-': function () {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate() - currentVal.evaluate();
            return new nodes.NumberNode(out);
        });
    },

    '*': function () {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate() * currentVal.evaluate();
            return new nodes.NumberNode(out);
        });
    },

    '/': function () {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate() / currentVal.evaluate();
            return new nodes.NumberNode(out);
        });
    },

    '^': function () {
        var reversedValues = this.children.reverse();
        return reversedValues.reduce(function (prevVal, currentVal) {
            var out = Math.pow(currentVal.evaluate(), prevVal.evaluate());
            return new nodes.NumberNode(out);
        });
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

module.exports = nodes;