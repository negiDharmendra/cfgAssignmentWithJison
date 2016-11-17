var expect = require('chai').expect;
var Node = require('../src/node.js').Node;
var NodeType = require('../src/node.js').NodeType;


describe("node", function () {
    it("should create node of value plus operator", function () {
        var node = new Node('+', NodeType.OPERATOR);
        console.log(typeof node);
        expect(node.toString()).to.be.equal(' plus ');
    });

    it("should create node of value times operator", function () {
        var node = new Node('*', NodeType.OPERATOR);
        console.log(typeof node);
        expect(node.toString()).to.be.equal(' times ');
    });

    it("should create node of value number", function () {
        var node = new Node(2, NodeType.NUMBER);
        expect(node.toString()).to.be.equal('two');
    });
});