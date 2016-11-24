var path = require('path');
var AssignmentNode = require(path.resolve('./src/assignmentNode.js'));
var OperatorNode = require(path.resolve('./src/operatorNode'));
var NumberNode = require(path.resolve('./src/numberNode'));
var IdentifierNode = require(path.resolve('./src/identifierNode'));


var lib = {};

lib.createOperatorNode = function (firstChild, operator, secondChild) {
    var operatorNode = new OperatorNode(operator);
    operatorNode.insertChild(firstChild);
    operatorNode.insertChild(secondChild);
    return operatorNode;
};

lib.createAssignmentNode = function (firstChild, operator, secondChild) {
    var assignmentNode = new AssignmentNode(operator);
    assignmentNode.insertChild(firstChild);
    assignmentNode.insertChild(secondChild);
    return assignmentNode;
};

lib.createNumberNode = function (number) {
    return new NumberNode(number);
};

lib.createIdentifierNode = function (identifier) {
    return new IdentifierNode(identifier);
};

lib.combineExpListAndExp = function (exp, expList) {
    if (expList.constructor === Array) {
        expList.unshift(exp);
        return expList;
    }
    else return [exp, expList];
};

lib.convertToList = function(expression){
    if(expression instanceof Array)
        return expression;
    return [expression];
};

module.exports = lib;