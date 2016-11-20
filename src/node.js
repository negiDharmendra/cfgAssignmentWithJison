var numberToWords = require('number-to-words').toWords;
var t = {};
t.NodeType = {OPERATOR: 'operator', NUMBER: 'number'};
t.operators = {'+': ' plus ', '*': ' times ', '^':' pow ','-':' minus ','=':' equal '};
t.Node = function (value, type) {
    this.value = value;
    this.type = type;
};

t.Node.prototype = {
    toString: function () {
        return this.type === t.NodeType.OPERATOR ? t.operators[this.value] : numberToWords(this.value);
    }
};


module.exports = t;
