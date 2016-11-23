var CUSTOM_ERROR = require('./customErrors');
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
        var value = assignmentTable.getValueOf(this.value);
        if (!value)
            throw new CUSTOM_ERROR.UndefinedIdentifierException(this.value);
        return value;
    },
    equalTo: function (object) {
        return this.value === object.value;
    },
    toString: function () {
        return this.value.toString();
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
        var identifier = this.children[0];
        var value = this.children[1].evaluate(assignmentTable);
        assignmentTable.populate(identifier, value);
        return value;
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

    evaluate: function (symbolTable) {
        return operators[this.value].apply(this, [symbolTable]).value;
    },

    equalTo: function (object) {
        if (!(object instanceof nodes.OperatorNode)) return false;
        if (!isValueEqual.call(this, object)) return false;
        if (this.children.length !== object.children.length) return false;
        return isChildrenEqual.call(this, object);
    }
};

operators = {

    '+': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) + currentVal.evaluate(symbolTable);
            return new nodes.NumberNode(out);
        });
    },

    '-': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) - currentVal.evaluate(symbolTable);
            return new nodes.NumberNode(out);
        });
    },

    '*': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) * currentVal.evaluate(symbolTable);
            return new nodes.NumberNode(out);
        });
    },

    '/': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var currentEvaluatedVal = currentVal.evaluate(symbolTable);
            var prevEvaluatedVal = prevVal.evaluate(symbolTable);
            if (currentEvaluatedVal === 0)
                throw new CUSTOM_ERROR.DivisionByZeroException(prevEvaluatedVal, currentEvaluatedVal);
            var out = prevEvaluatedVal / currentEvaluatedVal;
            return new nodes.NumberNode(out);
        });
    },

    '^': function (symbolTable) {
        var reversedValues = this.children.reverse();
        return reversedValues.reduce(function (prevVal, currentVal) {
            var out = Math.pow(currentVal.evaluate(symbolTable), prevVal.evaluate(symbolTable));
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