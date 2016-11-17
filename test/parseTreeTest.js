var expect = require('chai').expect;
var ParseTree = require('../src/parseTree.js');
var Node = require('../src/node.js').Node;
var NodeType = require('../src/node.js').NodeType;


describe("parseTree", function () {
    it("should represent 1+2 as (one plus two)", function () {
        var parseTree = new ParseTree(new Node('+', NodeType.OPERATOR));
        parseTree.addLeftNode(1);
        parseTree.addRightNode(2);
        expect(parseTree.toString()).to.be.equal('(one plus two)')
    });

    it("should represent 1+2+3 as ((one plus two) plus three)", function () {
        var child = new ParseTree(new Node('+', NodeType.OPERATOR));
        child.addLeftNode(1);
        child.addRightNode(2);

        var parseTree = new ParseTree(new Node('+', NodeType.OPERATOR));
        parseTree.addLeftNode(child);
        parseTree.addRightNode(3);
        expect(parseTree.toString()).to.be.equal('((one plus two) plus three)')
    });

    it("should represent 1*2 as (one times two)", function () {
        var parseTree = new ParseTree(new Node('*', NodeType.OPERATOR));
        parseTree.addLeftNode(1);
        parseTree.addRightNode(2);

        expect(parseTree.toString()).to.be.equal('(one times two)')
    });

    it("should represent 1*2*3 as ((one times two) times three)", function () {
        var child = new ParseTree(new Node('*', NodeType.OPERATOR));
        child.addLeftNode(1);
        child.addRightNode(2);

        var parseTree = new ParseTree(new Node('*', NodeType.OPERATOR));
        parseTree.addLeftNode(child);
        parseTree.addRightNode(3);

        expect(parseTree.toString()).to.be.equal('((one times two) times three)')
    });


    it("should represent 1+2*3 as (one plus (two times three))", function () {
        var child = new ParseTree(new Node('*', NodeType.OPERATOR));
        child.addLeftNode(2);
        child.addRightNode(3);

        var parseTree = new ParseTree(new Node('+', NodeType.OPERATOR));
        parseTree.addLeftNode(1);
        parseTree.addRightNode(child);

        expect(parseTree.toString()).to.be.equal('(one plus (two times three))')
    });


    it("should represent 1000000000*2000000 as (one billion times two million)", function () {
        var parseTree = new ParseTree(new Node('*', NodeType.OPERATOR));
        parseTree.addLeftNode(1000000000);
        parseTree.addRightNode(2000000);

        expect(parseTree.toString()).to.be.equal('(one billion times two million)')
    });
});