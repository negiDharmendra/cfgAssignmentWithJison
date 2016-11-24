var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');

var AssignmentNode = require('../src/assignmentNode');
var OperatorNode = require('../src/operatorNode');
var NumberNode = require('../src/numberNode');
var IdentifierNode = require('../src/identifierNode');
var Lib = require('../src/lib');

describe('calculator grammar', function () {

    it("should create numberNode", function () {

        var actual = Lib.createNumberNode(23);
        var expected = new NumberNode(23);
        assert.deepEqual(actual, expected);

    });

    it("should create identifierNode", function () {

        var actual = Lib.createIdentifierNode('a');
        var expected = new IdentifierNode('a');
        assert.deepEqual(actual, expected);

    });

    it("should create operatorNode", function () {

        var actual = Lib.createOperatorNode(23, '+', 24);
        var expected = new OperatorNode('+');
        expected.insertChild(23);
        expected.insertChild(24);
        assert.deepEqual(actual, expected);

    });

    it("should create assignmentNode", function () {

        var actual = Lib.createAssignmentNode('a', '=', 24);
        var expected = new AssignmentNode('=');
        expected.insertChild('a');
        expected.insertChild(24);
        assert.deepEqual(actual, expected);

    });


    it("should return an list of two expression for given two expression", function () {
        var firstExp = new AssignmentNode('=');
        firstExp.insertChild('a');
        firstExp.insertChild(24);

        var secondExp = new OperatorNode('+');
        secondExp.insertChild('a');
        secondExp.insertChild(24);

        var actual = Lib.combineExpListAndExp(firstExp, secondExp);

        var expected = [firstExp, secondExp];
        assert.deepEqual(actual, expected);

    });

    it("should return an list of three expression for given a expression and a expression list", function () {
        var firstExp = new AssignmentNode('=');
        firstExp.insertChild('a');
        firstExp.insertChild(24);

        var secondExp = new OperatorNode('+');
        secondExp.insertChild('a');
        secondExp.insertChild(24);

        var thirdExp = new OperatorNode('+');
        thirdExp.insertChild(24);
        thirdExp.insertChild(29);

        var actual = Lib.combineExpListAndExp(firstExp, [secondExp, thirdExp]);

        var expected = [firstExp, secondExp, thirdExp];
        assert.deepEqual(actual, expected);

    });

});

