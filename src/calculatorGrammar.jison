
/* description: Parses and executes mathematical expressions. */

%{
var path = require('path');
var ParseTree = require(path.resolve('./src/parseTree.js'));
var Node = require(path.resolve('./src/node.js')).Node;
var NodeType = require(path.resolve('./src/node.js')).NodeType;

var generateParseTree  = function($1 , $2, $3){
    var parseTree  =  new ParseTree(new Node($2, NodeType.OPERATOR));
    parseTree.addLeftNode($1);
    parseTree.addRightNode($3);
    return parseTree;
}

%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"                   return '+'
"*"                   return '*'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */


%left '+'
%left '*'


%start expressions

%% /* language grammar */

expressions
    : e EOF
        { return $1; }
    ;

e
    : e '+' e
        {
            $$ = generateParseTree($1,$2,$3);
        }
    | e '*' e
        {
             $$ = generateParseTree($1,$2,$3);
        }
    | NUMBER
        {$$ = Number(yytext);}
    ;
