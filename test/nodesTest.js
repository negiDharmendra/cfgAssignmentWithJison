var expect = require('chai').expect;

var AssignmentNode = require('../src/nodes.js').AssignmentNode;
var OperatorNode = require('../src/nodes.js').OperatorNode;
var NumberNode = require('../src/nodes.js').NumberNode;
var IdentifierNode = require('../src/nodes.js').IdentifierNode;
var SymbolTable = require('../src/symbolTable');

describe('Nodes', function () {
    describe('IdentifierNode', function () {
        describe('equalTo', function () {
            it('should return true object is of similar type with similar value', function () {
                var identifierNode = new IdentifierNode('a');
                var identifierNode1 = new IdentifierNode('a');
                expect(identifierNode.equalTo(identifierNode1)).to.be.equal(true);
            });

            it('should return false object is of dissimilar type with similar value', function () {
                var identifierNode = new IdentifierNode('a');
                var identifierNode1 = new Object('a');
                expect(identifierNode.equalTo(identifierNode1)).to.equal(false);
            });

            it('should return false object is of similar type with dissimilar value', function () {
                var identifierNode = new IdentifierNode('a');
                var identifierNode1 = new IdentifierNode('b');
                expect(identifierNode.equalTo(identifierNode1)).to.equal(false);
            });
        });


        describe('evaluate', function () {

            var identifierNode;
            var symbolTable;
            beforeEach(function () {
                identifierNode = new IdentifierNode('a');
                symbolTable = new SymbolTable();
            });

            it('should evaluate it self', function () {
                symbolTable.populate('a', 23);
                var actual = identifierNode.evaluate(symbolTable);
                expect(actual, 'to equal', 23);
            });

            it('should throw UndefinedIdentifierException', function () {
                symbolTable.populate('b', 23);
                var evaluate = function () {
                    identifierNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(Error, /undefined identifier => a/);
            });
        });
    });
    describe('AssignmentNode', function () {

        describe('equalTo', function () {

            var assignmentNode;
            beforeEach(function () {
                assignmentNode = new AssignmentNode('=');
                assignmentNode.insertChild(new IdentifierNode('a'));
                assignmentNode.insertChild(new NumberNode(4));
            });

            it('should return true when object are of similar type with similar children', function () {

                var assignmentNode1 = new AssignmentNode('=');
                assignmentNode1.insertChild(new IdentifierNode('a'));
                assignmentNode1.insertChild(new NumberNode(4));

                expect(assignmentNode.equalTo(assignmentNode1)).to.be.equal(true);

            });

            it('should return false when object are of dissimilar type with similar children', function () {

                var operatorNode = new OperatorNode('+');
                operatorNode.insertChild(new NumberNode(4));

                expect(assignmentNode.equalTo(operatorNode)).to.equal(false);

            });

            it('should return false when objects are of similar type with dissimilar children', function () {

                var assignmentNode1 = new AssignmentNode('=');
                assignmentNode1.insertChild(new IdentifierNode('a'));
                assignmentNode1.insertChild(new NumberNode(6));

                expect(assignmentNode.equalTo(assignmentNode1)).to.equal(false);

            });

        });

        describe('evaluate', function () {

            var symbolTable;
            var assignmentNode;
            beforeEach(function () {
                symbolTable = new SymbolTable();
                assignmentNode = new AssignmentNode('=');
                assignmentNode.insertChild(new IdentifierNode('a'));
                assignmentNode.insertChild(new NumberNode(4));
            });

            it('should evaluate it self and populate the assignment table', function () {
                assignmentNode.evaluate(symbolTable);

                var expectedAssignmentTable = {a: 4};
                expect(symbolTable.table).to.be.deep.equal(expectedAssignmentTable);
            });

            it('should evaluate it self when children are of AssignmentNode type', function () {
                var assignmentNode = new AssignmentNode('=');
                assignmentNode.insertChild(new IdentifierNode('a'));

                var assignmentNode2 = new AssignmentNode();
                assignmentNode2.insertChild(new IdentifierNode('b'));
                assignmentNode2.insertChild(new NumberNode(4));

                assignmentNode.insertChild(assignmentNode2);
                assignmentNode.evaluate(symbolTable);

                var expectedAssignmentTable = {a: 4, b: 4};
                expect(symbolTable.table).to.be.deep.equal(expectedAssignmentTable);
            });

        });

    });

    describe('OperatorNode', function () {


        describe(' + operator', function () {

            describe('equalTo', function () {

                var plusOperatorNode;
                beforeEach(function () {
                    plusOperatorNode = new OperatorNode('+');
                    plusOperatorNode.insertChild(new NumberNode(4));
                });

                it('should return true when object are of similar type with similar children', function () {

                    var plusOperatorNode1 = new OperatorNode('+');
                    plusOperatorNode1.insertChild(new NumberNode(4));

                    expect(plusOperatorNode.equalTo(plusOperatorNode1)).to.be.equal(true);

                });

                it('should return false when object are of dissimilar type with similar children', function () {

                    var assignmentNode = new AssignmentNode('a');
                    assignmentNode.insertChild(new NumberNode(4));

                    expect(plusOperatorNode.equalTo(assignmentNode)).to.equal(false);

                });

                it('should return false when object are of similar type with dissimilar children', function () {

                    var plusOperatorNode1 = new OperatorNode('+');
                    plusOperatorNode1.insertChild(new NumberNode(6));

                    expect(plusOperatorNode.equalTo(plusOperatorNode1)).to.equal(false);

                });

            });

            describe('evaluate', function () {

                it('should evaluate it self', function () {
                    var assignmentTable = {};
                    var plusOperatorNode = new OperatorNode('+');
                    plusOperatorNode.insertChild(new NumberNode(4));
                    plusOperatorNode.insertChild(new NumberNode(5));

                    expect(plusOperatorNode.evaluate()).to.be.equal(9);
                });

            });

        });

        describe(' - operator', function () {

            describe('equalTo', function () {

                var minusOperatorNode;
                beforeEach(function () {
                    minusOperatorNode = new OperatorNode('-');
                    minusOperatorNode.insertChild(new NumberNode(4));
                });

                it('should return true when object are of similar type with similar children', function () {

                    var minusOperatorNode1 = new OperatorNode('-');
                    minusOperatorNode1.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.be.equal(true);

                });

                it('should return false when object are of dissimilar type with similar children', function () {

                    var assignmentNode = new AssignmentNode('a');
                    assignmentNode.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(assignmentNode)).to.equal(false);

                });

                it('should return false when object are of similar type with dissimilar children', function () {

                    var minusOperatorNode1 = new OperatorNode('-');
                    minusOperatorNode1.insertChild(new NumberNode(6));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.equal(false);

                });

            });
            describe('evaluate', function () {

                it('should evaluate it self', function () {
                    var minusOperatorNode = new OperatorNode('-');
                    minusOperatorNode.insertChild(new NumberNode(4));
                    minusOperatorNode.insertChild(new NumberNode(5));

                    expect(minusOperatorNode.evaluate()).to.be.equal(-1);
                });

            });

        });

        describe(' * operator', function () {
            describe('equalTo', function () {

                var minusOperatorNode;
                beforeEach(function () {
                    minusOperatorNode = new OperatorNode('*');
                    minusOperatorNode.insertChild(new NumberNode(4));
                });

                it('should return true when object are of similar type with similar children', function () {

                    var minusOperatorNode1 = new OperatorNode('*');
                    minusOperatorNode1.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.be.equal(true);

                });

                it('should return false when object are of dissimilar type with similar children', function () {

                    var assignmentNode = new AssignmentNode('a');
                    assignmentNode.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(assignmentNode)).to.equal(false);

                });

                it('should return false when object are of similar type with dissimilar children', function () {

                    var minusOperatorNode1 = new OperatorNode('*');
                    minusOperatorNode1.insertChild(new NumberNode(6));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.equal(false);

                });

            });
            describe('evaluate', function () {
                it('should evaluate it self', function () {
                    var mulOperatorNode = new OperatorNode('*');
                    mulOperatorNode.insertChild(new NumberNode(4));
                    mulOperatorNode.insertChild(new NumberNode(5));

                    expect(mulOperatorNode.evaluate()).to.be.equal(20);
                });
            });

        });

        describe(' / operator', function () {
            describe('equalTo', function () {

                var minusOperatorNode;
                beforeEach(function () {
                    minusOperatorNode = new OperatorNode('/');
                    minusOperatorNode.insertChild(new NumberNode(4));
                });

                it('should return true when object are of similar type with similar children', function () {

                    var minusOperatorNode1 = new OperatorNode('/');
                    minusOperatorNode1.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.be.equal(true);

                });

                it('should return false when object are of dissimilar type with similar children', function () {

                    var assignmentNode = new AssignmentNode('a');
                    assignmentNode.insertChild(new NumberNode(4));

                    expect(minusOperatorNode.equalTo(assignmentNode)).to.equal(false);

                });

                it('should return false when object are of similar type with dissimilar children', function () {

                    var minusOperatorNode1 = new OperatorNode('/');
                    minusOperatorNode1.insertChild(new NumberNode(6));

                    expect(minusOperatorNode.equalTo(minusOperatorNode1)).to.equal(false);

                });

            });
            describe('evaluate', function () {
                it('should evaluate it self', function () {
                    var divisionOperatorNode = new OperatorNode('/');
                    divisionOperatorNode.insertChild(new NumberNode(40));
                    divisionOperatorNode.insertChild(new NumberNode(20));
                    divisionOperatorNode.insertChild(new NumberNode(2));

                    expect(divisionOperatorNode.evaluate()).to.be.equal(1);
                });
            });

        });

        describe(' ^ operator', function () {

            describe('evaluate', function () {
                it('should evaluate it self', function () {
                    var powOperatorNode = new OperatorNode('^');
                    powOperatorNode.insertChild(new NumberNode(3));
                    powOperatorNode.insertChild(new NumberNode(3));
                    powOperatorNode.insertChild(new NumberNode(2));

                    expect(powOperatorNode.evaluate()).to.be.equal(19683);
                });
            });

        });
    });

});
