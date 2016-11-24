var fs = require('fs');
var TreeProcessor = require('./src/treeProcessor.js');
var SymbolTable = require('./src/symbolTable');
var readLine = require('readline');

var repl = {};

var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: '==> '
});
rl.prompt();

function stdinMode(parser) {
    rl.on('line', function (text) {
        process.stdout.write(takeOperation(text, parser));
        process.stdout.write('\n');
        rl.prompt();
    });
    rl.on('close', function () {
        process.exit(0);
    });
}

function takeOperation(text, parser) {
    try {
        var tree = parser.parse(text);
        var treeProcessor = new TreeProcessor(tree);
        return treeProcessor.evaluate(new SymbolTable());
    }
    catch (e) {
        return e.message;
    }
}
//
// function stdinMode(parser) {
//     return callRepl(takeOperation, parser);
// }

process.stdin.setRawMode(true);
process.stdin.resume();
module.exports = stdinMode;