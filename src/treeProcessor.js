var numberToWords = require('number-to-words').toWords;
var AssignmentNode = require('./assignmentNode');
var operators = {'+': 'plus', '*': 'times', '^': 'pow', '-': 'minus', '=': 'equal'};


var TreeProcessor = function (tree) {
    this.tree = tree;
};

TreeProcessor.prototype = {
    evaluate: function (symbolTable) {
        var results = [];
        this.tree.forEach(function (node) {
            if (!(node instanceof AssignmentNode))
                results.push(node.evaluate(symbolTable));
            else
                node.evaluate(symbolTable);
        });
        return results.join();
    }
};

function isNumber(num) {
    return num.constructor === Number;
}

function isArray(array) {
    return array.constructor === Array;
}

function isIdentifier(value) {
    return value.match(/\w+/g);
}

function toWords(value) {
    return numberToWords(value).replace(/\s+/g, '-');
}

module.exports = TreeProcessor;
