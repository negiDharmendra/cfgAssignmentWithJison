var nodes = {};
var operators = {};

nodes.NumberNode = function (value) {
    this.value = value;
    this.evaluate = function () {
        return this.value;
    };
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
        var child = this.children[0];
        if (child instanceof nodes.AssignmentNode) {
            child.evaluate(assignmentTable);
            assignmentTable[this.value] = child.value;
        }
        else
            assignmentTable[this.value] = child.evaluate(assignmentTable);
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
            var out = Math.pow(currentVal.evaluate(),prevVal.evaluate());
            return new nodes.NumberNode(out);
        });
    }

};

module.exports = nodes;