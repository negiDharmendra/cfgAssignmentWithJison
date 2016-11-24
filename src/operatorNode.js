var CUSTOM_ERROR = require('./customErrors');
var NumberNode = require('./numberNode');


var operators = {};

var OperatorNode = function (value) {
    this.value = value;
    this.children = [];
};

OperatorNode.prototype = {

    insertChild: function (child) {
        this.children.push(child);
    },

    evaluate: function (symbolTable) {
        return operators[this.value].apply(this, [symbolTable]).value;
    },

    equalTo: function (object) {
        if (!(object instanceof OperatorNode)) return false;
        if (!isValueEqual.call(this, object)) return false;
        if (this.children.length !== object.children.length) return false;
        return isChildrenEqual.call(this, object);
    }
};

operators = {

    '+': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) + currentVal.evaluate(symbolTable);
            return new NumberNode(out);
        });
    },

    '-': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) - currentVal.evaluate(symbolTable);
            return new NumberNode(out);
        });
    },

    '*': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var out = prevVal.evaluate(symbolTable) * currentVal.evaluate(symbolTable);
            return new NumberNode(out);
        });
    },

    '/': function (symbolTable) {
        return this.children.reduce(function (prevVal, currentVal) {
            var currentEvaluatedVal = currentVal.evaluate(symbolTable);
            var prevEvaluatedVal = prevVal.evaluate(symbolTable);
            if (currentEvaluatedVal === 0)
                throw new CUSTOM_ERROR.DivisionByZeroException(prevEvaluatedVal, currentEvaluatedVal);
            var out = prevEvaluatedVal / currentEvaluatedVal;
            return new NumberNode(out);
        });
    },

    '^': function (symbolTable) {
        var reversedValues = this.children.reverse();
        return reversedValues.reduce(function (prevVal, currentVal) {
            var out = Math.pow(currentVal.evaluate(symbolTable), prevVal.evaluate(symbolTable));
            return new NumberNode(out);
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

module.exports = OperatorNode;