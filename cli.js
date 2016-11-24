var fs = require('fs');
var TreeProcessor = require('./src/treeProcessor.js');
var SymbolTable = require('./src/symbolTable');



function filterOption(args) {
    return args.filter(function (arg) {
        return arg.match(/^-[f]/g);
    });
}

function filterFileName(args) {
    return args.filter(function (arg) {
        return arg[0]!=='-';
    });
}

function processTree(tree, fileName) {
    var out = new TreeProcessor(tree).evaluate(new SymbolTable());
    if (fileName)console.log('Output of ' + fileName);
    console.log(out);
}

function parseFiles(files,parser) {
    files.forEach(function (file) {
        var programme = fs.readFileSync(file, 'utf-8');
        var tree = parser.parse(programme);
        processTree(tree, file);
    });
}


function parseCommandLineText(text,parser) {
    var tree = parser.parse(text);
    processTree(tree);
}

function readTextOrFile(args,parser) {
    var option = filterOption(args);
    var files = filterFileName(args);
    if (option.length > 0 && option[0] === '-f')
        parseFiles(files,parser);
    else {
        parseCommandLineText(files[0],parser);
    }
}



module.exports = readTextOrFile;
