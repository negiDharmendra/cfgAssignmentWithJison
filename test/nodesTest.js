var expect = require('chai').expect;

var AssignmentNode = require('../src/assignmentNode');
var OperatorNode = require('../src/operatorNode');
var NumberNode = require('../src/numberNode');
var IdentifierNode = require('../src/identifierNode');
var SymbolTable = require('../src/symbolTable');
var UndefinedIdentifierException = require('../src/customErrors').UndefinedIdentifierException;
var DivisionByZeroException = require('../src/customErrors').DivisionByZeroException;


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

                var assignmentNode = new AssignmentNode('=');
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
            var symbolTable;
            var plusOperatorNode;

            beforeEach(function () {
                symbolTable = new SymbolTable();
                symbolTable.populate('a', 10);
                plusOperatorNode = new OperatorNode('+');
            });

            it('should evaluate it self', function () {
                plusOperatorNode.insertChild(new NumberNode(4));
                plusOperatorNode.insertChild(new NumberNode(5));

                expect(plusOperatorNode.evaluate(symbolTable)).to.be.equal(9);
            });

            it('should evaluate it self', function () {
                plusOperatorNode.insertChild(new IdentifierNode('a'));
                plusOperatorNode.insertChild(new NumberNode(5));

                expect(plusOperatorNode.evaluate(symbolTable)).to.be.equal(15);
            });

            it('should throw UndefinedIdentifierException', function () {
                plusOperatorNode.insertChild(new IdentifierNode('b'));
                plusOperatorNode.insertChild(new NumberNode(5));
                var evaluate = function () {
                    plusOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(UndefinedIdentifierException);
                expect(evaluate).to.throw(/Undefined identifier => b/);
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

                var assignmentNode = new AssignmentNode('=');
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

            var symbolTable;
            var minusOperatorNode;

            beforeEach(function () {
                symbolTable = new SymbolTable();
                symbolTable.populate('a', 10);
                minusOperatorNode = new OperatorNode('-');
            });

            it('should evaluate it self', function () {
                minusOperatorNode.insertChild(new NumberNode(4));
                minusOperatorNode.insertChild(new NumberNode(5));

                expect(minusOperatorNode.evaluate()).to.be.equal(-1);
            });

            it('should throw UndefinedIdentifierException', function () {
                minusOperatorNode.insertChild(new IdentifierNode('b'));
                minusOperatorNode.insertChild(new NumberNode(5));
                var evaluate = function () {
                    minusOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(UndefinedIdentifierException);
                expect(evaluate).to.throw(/Undefined identifier => b/);
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

                var assignmentNode = new AssignmentNode('=');
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
            var symbolTable;
            var minusOperatorNode;

            beforeEach(function () {
                symbolTable = new SymbolTable();
                symbolTable.populate('a', 10);
                minusOperatorNode = new OperatorNode('-');
            });
            it('should throw UndefinedIdentifierException', function () {
                minusOperatorNode.insertChild(new IdentifierNode('b'));
                minusOperatorNode.insertChild(new NumberNode(5));
                var evaluate = function () {
                    minusOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(UndefinedIdentifierException);
                expect(evaluate).to.throw(/Undefined identifier => b/);
            });
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

                var assignmentNode = new AssignmentNode('=');
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
            var symbolTable;
            var divisionOperatorNode;

            beforeEach(function () {
                symbolTable = new SymbolTable();
                symbolTable.populate('a', 10);
                divisionOperatorNode = new OperatorNode('/');
            });

            it('should evaluate it self', function () {

                divisionOperatorNode.insertChild(new NumberNode(40));
                divisionOperatorNode.insertChild(new NumberNode(20));
                divisionOperatorNode.insertChild(new NumberNode(2));

                expect(divisionOperatorNode.evaluate()).to.be.equal(1);
            });

            it('should throw UndefinedIdentifierException', function () {
                divisionOperatorNode.insertChild(new IdentifierNode('d'));
                divisionOperatorNode.insertChild(new NumberNode(5));
                var evaluate = function () {
                    divisionOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(UndefinedIdentifierException);
                expect(evaluate).to.throw(/Undefined identifier => d/);
            });


            it('should throw DivisionByZeroException', function () {
                divisionOperatorNode.insertChild(new IdentifierNode('a'));
                divisionOperatorNode.insertChild(new NumberNode(0));
                var evaluate = function () {
                    divisionOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(DivisionByZeroException);
                var expectedMessage = /Invalid division operation 10\/0\. Divisor must be a integer other than zero/;
                expect(evaluate).to.throw(expectedMessage);
            });

        });

    });

    describe(' ^ operator', function () {

        describe('equalTo', function () {

            var powOperatorNode;
            beforeEach(function () {
                powOperatorNode = new OperatorNode('^');
                powOperatorNode.insertChild(new NumberNode(4));
            });

            it('should return true when object are of similar type with similar children', function () {

                var minusOperatorNode1 = new OperatorNode('^');
                minusOperatorNode1.insertChild(new NumberNode(4));

                expect(powOperatorNode.equalTo(minusOperatorNode1)).to.be.equal(true);

            });

            it('should return false when object are of dissimilar type with similar children', function () {

                var assignmentNode = new AssignmentNode('=');
                assignmentNode.insertChild(new NumberNode(4));

                expect(powOperatorNode.equalTo(assignmentNode)).to.equal(false);

            });

            it('should return false when object are of similar type with dissimilar children', function () {

                var minusOperatorNode1 = new OperatorNode('^');
                minusOperatorNode1.insertChild(new NumberNode(6));

                expect(powOperatorNode.equalTo(minusOperatorNode1)).to.equal(false);

            });

        });
        describe('evaluate', function () {
            var symbolTable;
            var powOperatorNode;

            beforeEach(function () {
                symbolTable = new SymbolTable();
                symbolTable.populate('a', 10);
                powOperatorNode = new OperatorNode('^');
            });

            it('should evaluate it self', function () {
                powOperatorNode.insertChild(new NumberNode(3));
                powOperatorNode.insertChild(new NumberNode(3));
                powOperatorNode.insertChild(new NumberNode(2));

                expect(powOperatorNode.evaluate()).to.be.equal(19683);
            });

            it('should throw UndefinedIdentifierException', function () {
                powOperatorNode.insertChild(new IdentifierNode('b'));
                powOperatorNode.insertChild(new NumberNode(5));
                var evaluate = function () {
                    powOperatorNode.evaluate(symbolTable);
                };
                expect(evaluate).to.throw(UndefinedIdentifierException);
                expect(evaluate).to.throw(/Undefined identifier => b/);
            });


        });

    });
});

