var assert = require('chai').assert;
var TreeProcessor = require('../src/treeProcessor.js');

describe('TreeProcessor', function () {
    describe('toParenthesis', function () {

        it("should represent ['+', 1, 2] as ( plus one two )", function () {
            var tree = ['+', 1, 2];
            var actual = new TreeProcessor(tree);
            var expected = '( plus one two )';
            assert.deepEqual(actual.toParenthesis(), expected)
        });

        it("should represent ['+',['+',1,2],3] as ( plus ( plus one two ) three )", function () {
            var tree = ['+', ['+', 1, 2], 3];
            var actual = new TreeProcessor(tree);
            var expected = '( plus ( plus one two ) three )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent ['*',1,2] as ( times one two )", function () {
            var tree = ['*', 1, 2];
            var actual = new TreeProcessor(tree);
            var expected = '( times one two )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent ['*',['*',1,2],3] as ( times ( times one two ) three )", function () {
            var tree = ['*', ['*', 1, 2], 3];
            var actual = new TreeProcessor(tree);
            var expected = '( times ( times one two ) three )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });


        it("should represent ['+',1,['*',2,3]] as ( plus one ( times two three ) )", function () {
            var tree = ['+', 1, ['*', 2, 3]];
            var actual = new TreeProcessor(tree);
            var expected = '( plus one ( times two three ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });


        it("should represent ['*',1000000000,2000000] as ( times one-billion two-million )", function () {
            var tree = ['*', 1000000000, 2000000];
            var actual = new TreeProcessor(tree);
            var expected = '( times one-billion two-million )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent ['^',3,2] as ( pow three two )", function () {
            var tree = ['^', 3, 2];
            var actual = new TreeProcessor(tree);
            var expected = '( pow three two )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent ['=','a',2] as ( equal a two )", function () {
            var tree = ['=', 'a', 2];
            var actual = new TreeProcessor(tree);
            var expected = '( equal a two )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent [['=','a',5],['+',2,4]] as ( ( equal a five ) ( plus two four ) )", function () {
            var tree = [['=', 'a', 5], ['+', 2, 4]];
            var actual = new TreeProcessor(tree);
            var expected = '( ( equal a five ) ( plus two four ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent [['=','a',5],['+','a',4]] as ( ( equal a five ) ( plus a four ) )", function () {
            var tree = [['=', 'a', 5], ['+', 'a', 4]];
            var actual = new TreeProcessor(tree);
            var expected = '( ( equal a five ) ( plus a four ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it.skip("should represent ['=','a',['=','v',2]] as ( equal a ( equal v two ) )", function () {
            var tree = ['=', 'a', ['=', 'v', 2]];
            var actual = new TreeProcessor(tree);
            var expected = '( equal a ( equal v two ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it.skip("should represent ['=','a',['=','v',['=','c',2]]] as ( equal a ( equal v ( equal c two ) ) )", function () {
            var tree = ['=', 'a', ['=', 'v', ['=', 'c', 2]]];
            var actual = new TreeProcessor(tree);
            var expected = '( equal a ( equal v ( equal c two ) ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent [['=','a',3],['=','b',2]] as ( ( equal a three ) ( equal b two ) )", function () {
            var tree = [['=', 'a', 3], ['=', 'b', 2]];
            var actual = new TreeProcessor(tree);
            var expected = '( ( equal a three ) ( equal b two ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it.skip("should represent [['=','a',['=','c',3]],['=','b',2]] as ( ( equal a ( equal v two ) ) ( equal two ) )", function () {
            var tree = [['=', 'a', ['=', 'c', 3]], ['=', 'b', 2]];
            var actual = new TreeProcessor(tree);
            var expected = '( ( equal a ( equal v two ) ) ( equal two ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should represent ['=','a',['+',2,3]] as ( equal a ( plus two three ) )", function () {
            var tree = ['=', 'a', ['+', 2, 3]];
            var actual = new TreeProcessor(tree);
            var expected = '( equal a ( plus two three ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });

        it("should be able to represent [['=','a',['+',23,23]],['=','f',['+',4,4]],['=','d',4],['=','d',['+',4,45]]]", function () {
            var tree = [['=', 'a', ['+', 23, 23]], ['=', 'f', ['+', 4, 4]], ['=', 'd', 4], ['=', 'd', ['+', 4, 45]]];
            var actual = new TreeProcessor(tree);
            var expected = '( ( equal a ( plus twenty-three twenty-three ) ) ( equal f ( plus four four ) ) ( equal d four ) ( equal d ( plus four forty-five ) ) )';
            assert.deepEqual(actual.toParenthesis(), expected);
        });
    });
});

