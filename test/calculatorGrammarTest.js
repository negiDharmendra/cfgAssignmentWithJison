var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');

var AssignmentNode = require('../src/assignmentNode');
var OperatorNode = require('../src/operatorNode');
var NumberNode = require('../src/numberNode');
var IdentifierNode = require('../src/identifierNode');

var grammar = fs.readFileSync('./src/calculatorGrammar.jison', 'utf-8');

var Parser = require('jison').Parser;
var parser = new Parser(grammar);

describe('calculator grammar', function () {
    it("should represent 1+2 as ['+',1,2]", function () {
        var actual = parser.parse('1+2;');
        var operatorNode = new OperatorNode('+');
        operatorNode.insertChild(new NumberNode(1));
        operatorNode.insertChild(new NumberNode(2));
        var expected = operatorNode;
        assert.deepEqual(actual, expected);
    });

    it("should represent 1+2+3 as ['+', ['+', 1, 2], 3]", function () {
        var actual = parser.parse('1+2+3;');

        var childOperatorNode = new OperatorNode('+');
        childOperatorNode.insertChild(new NumberNode(1));
        childOperatorNode.insertChild(new NumberNode(2));

        var rootOperatorNode = new OperatorNode('+');
        rootOperatorNode.insertChild(childOperatorNode);
        rootOperatorNode.insertChild(new NumberNode(3));

        var expected = rootOperatorNode;

        assert.deepEqual(actual, expected);
    });

    it("should represent 1*2 as ['*', 1, 2]", function () {
        var actual = parser.parse('1*2;');
        var operatorNode = new OperatorNode('*');
        operatorNode.insertChild(new NumberNode(1));
        operatorNode.insertChild(new NumberNode(2));
        var expected = operatorNode;
        assert.deepEqual(actual, expected);
    });

    it("should represent 1*2*3 as ['*', ['*', 1, 2], 3]", function () {
        var actual = parser.parse('1*2*3;');

        var childOperatorNode = new OperatorNode('*');
        childOperatorNode.insertChild(new NumberNode(1));
        childOperatorNode.insertChild(new NumberNode(2));

        var rootOperatorNode = new OperatorNode('*');
        rootOperatorNode.insertChild(childOperatorNode);
        rootOperatorNode.insertChild(new NumberNode(3));

        var expected = rootOperatorNode;

        assert.deepEqual(actual, expected);
    });


    it("should represent 1+2*3 as ['+', 1, ['*', 2, 3]]", function () {
        var actual = parser.parse('1+2*3;');

        var childOperatorNode = new OperatorNode('*');
        childOperatorNode.insertChild(new NumberNode(2));
        childOperatorNode.insertChild(new NumberNode(3));

        var rootOperatorNode = new OperatorNode('+');
        rootOperatorNode.insertChild(new NumberNode(1));
        rootOperatorNode.insertChild(childOperatorNode);

        var expected = rootOperatorNode;

        assert.deepEqual(actual, expected);
    });


    it("should represent 1000000000*2000000 as ['*', 1000000000, 2000000]", function () {
        var actual = parser.parse('1000000000*2000000;');

        var operatorNode = new OperatorNode('*');
        operatorNode.insertChild(new NumberNode(1000000000));
        operatorNode.insertChild(new NumberNode(2000000));
        var expected = operatorNode;
        assert.deepEqual(actual, expected);

        assert.deepEqual(actual, expected);
    });

    it("should represent 3^2; as ['^', 3, 2]", function () {
        var actual = parser.parse('3^2;');

        var operatorNode = new OperatorNode('^');
        operatorNode.insertChild(new NumberNode(3));
        operatorNode.insertChild(new NumberNode(2));
        var expected = operatorNode;

        assert.deepEqual(actual, expected);
    });

    it("should represent a=2; as ['=', 'a', 2]", function () {
        var actual = parser.parse('a=2;');
        var assignmentNode = new AssignmentNode('=');
        assignmentNode.insertChild(new IdentifierNode('a'));
        assignmentNode.insertChild(new NumberNode(2));
        assert.deepEqual(actual, assignmentNode);
    });

    it("should represent a=5;2+4 as [['=', 'a', 2],['+',4,5]]", function () {
        var actual = parser.parse('a=5;2+4;');
        var assignmentNode = new AssignmentNode('=');
        assignmentNode.insertChild(new IdentifierNode('a'));
        assignmentNode.insertChild(new NumberNode(5));

        var operatorNode = new OperatorNode('+');
        operatorNode.insertChild(new NumberNode(2));
        operatorNode.insertChild(new NumberNode(4));

        var expected = [assignmentNode, operatorNode];
        assert.deepEqual(actual, expected);
    });

    it("should represent a=5;a+4 as [['=', 'a', 2],['+',a,5]]", function () {
        var actual = parser.parse('a=5;a+4;');

        var assignmentNode = new AssignmentNode('=');
        assignmentNode.insertChild(new IdentifierNode('a'));
        assignmentNode.insertChild(new NumberNode(5));

        var operatorNode = new OperatorNode('+');
        operatorNode.insertChild(new IdentifierNode('a'));
        operatorNode.insertChild(new NumberNode(4));

        var expected = [assignmentNode, operatorNode];
        assert.deepEqual(actual, expected);
    });

    it("should represent a=3;b=2; as [['=', 'a', 3],['=','b',2]]", function () {
        var actual = parser.parse('a=3;b=2;');

        var assignmentNode = new AssignmentNode('=');
        assignmentNode.insertChild(new IdentifierNode('a'));
        assignmentNode.insertChild(new NumberNode(3));

        var secondAssignmentNode = new AssignmentNode('=');
        secondAssignmentNode.insertChild(new IdentifierNode('b'));
        secondAssignmentNode.insertChild(new NumberNode(2));

        var expected = [assignmentNode, secondAssignmentNode];
        assert.deepEqual(actual, expected);
    });

    it("should represent a=2+3; as ['=', 'a', ['+', 2, 3]]", function () {
        var actual = parser.parse('a=2+3;');

        var operatorNode = new OperatorNode('+');
        operatorNode.insertChild(new NumberNode(2));
        operatorNode.insertChild(new NumberNode(3));

        var expectedNode = new AssignmentNode('=');
        expectedNode.insertChild(new IdentifierNode('a'));
        expectedNode.insertChild(operatorNode);

        assert.deepEqual(actual, expectedNode);
    });

    it("should be able to generate tree for a=23+23;f=4+4;d=4;d=4+45;", function () {
        var actual = parser.parse('a=23+23;f=23+23;d=4;23+23;');

        var operatorNode = new OperatorNode('+');
        operatorNode.insertChild(new NumberNode(23));
        operatorNode.insertChild(new NumberNode(23));

        var assignmentNodeA = new AssignmentNode('=');
        assignmentNodeA.insertChild(new IdentifierNode('a'));
        assignmentNodeA.insertChild(operatorNode);


        var assignmentNodeB = new AssignmentNode('=');
        assignmentNodeB.insertChild(new IdentifierNode('f'));
        assignmentNodeB.insertChild(operatorNode);


        var assignmentNodeD = new AssignmentNode('=');
        assignmentNodeD.insertChild(new IdentifierNode('d'));
        assignmentNodeD.insertChild(new NumberNode(4));

        var expected = [assignmentNodeA, assignmentNodeB, assignmentNodeD, operatorNode];
        assert.deepEqual(actual, expected);
    });


});

