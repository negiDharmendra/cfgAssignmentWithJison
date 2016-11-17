var Node = require('./node.js').Node;
var NodeType = require('./node.js').NodeType;

var ParseTree = function (rootNode) {
    this.rootNode = rootNode;

    this.addLeftNode = function (child) {
        if (typeof child === NodeType.NUMBER)
            this.leftNode = new Node(child, NodeType.NUMBER);
        else
            this.leftNode = child;
    };

    this.addRightNode = function (child) {
        if (typeof child === NodeType.NUMBER)
            this.rightNode = new Node(child, NodeType.NUMBER);
        else
            this.rightNode = child;
    };

    this.toString = function () {
        return '(' + this.leftNode + this.rootNode + this.rightNode + ')';
    }
};

module.exports = ParseTree;