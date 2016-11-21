var numberToWords = require('number-to-words').toWords;
var operators = {'+': ' plus ', '*': ' times ', '^': ' pow ', '-': ' minus ', '=': ' equal '};

function toParenthesis(tree) {
    var out = " ( ";
    var space = ' ';
    for (var index in tree) {
        var value = tree[index];
        if (isNumber(value)) {
            out += numberToWords(value).replace(/\s+/g,'-') + space;
        }
        else if (isArray(value)) {
            out += toParenthesis(value);
        }
        else if (value.match(/\w+/g)){
            out += value + space;
        }
        else out += operators[value];
    }
    out += " ) ";
    return out.replace(/\s+/g,' ');
}

function isNumber(num) {
    return num.constructor == Number;
}

function isArray(array) {
    return array.constructor == Array;
}

module.exports = toParenthesis;