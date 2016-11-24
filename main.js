var args = process.argv.slice(2);

var repl = require('./repl.js');
var cli = require('./cli.js');

var Parser = require('jison').Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./src/calculatorGrammar.jison', 'utf-8');


var parser;

parser = new Parser(grammar);


function main(args) {
    if (args.length <= 0)
        return repl(parser);
    cli(args, parser);
}

main(args);
