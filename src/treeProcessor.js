var numberToWords = require('number-to-words').toWords;
var operators = {'+': 'plus', '*': 'times', '^': 'pow', '-': 'minus', '=': 'equal'};


var TreeProcessor = function (tree) {
    this.tree = tree;
};

TreeProcessor.prototype = {
    toParenthesis: function () {
        var representation = ['('];
        for (var index in this.tree) {
            var value = this.tree[index];
            if (isNumber(value))
                representation.push(toWords(value));
            else if (isArray(value))
                representation.push(new TreeProcessor(value).toParenthesis());
            else if (isIdentifier(value))
                representation.push(value);
            else representation.push(operators[value]);
        }
        representation.push(')');
        return representation.join(' ');
    }
};
function isNumber(num) {
    return num.constructor == Number;
}

function isArray(array) {
    return array.constructor == Array;
}

function isIdentifier(value) {
    return value.match(/\w+/g);
}

function toWords(value) {
    return numberToWords(value).replace(/\s+/g, '-');
}

module.exports = TreeProcessor;
