%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

%{

var path = require('path');
var AssignmentNode = require(path.resolve('./src/nodes.js')).AssignmentNode;
var OperatorNode = require(path.resolve('./src/nodes.js')).OperatorNode;
var NumberNode = require(path.resolve('./src/nodes.js')).NumberNode;
var IdentifierNode = require(path.resolve('./src/nodes.js')).IdentifierNode;


    function combineExpListAndExp($1,$2){
        if($2.constructor == Array){
            $2.unshift($1);
            return $2
        }
        else return [$1,$2];
    }
%}

/* lexical grammar */
%lex
%%

%token IDENTIFIER

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-z]+                return 'IDENTIFIER'
"*"                   return '*'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"="                   return '='
"("                   return '('
")"                   return ')'
";"                   return 'TERMINATOR'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*'
%left '^'
%left '='

%start expressions

%% /* language grammar */



expressions
    : expression EOF
        { return $1 }
    ;

expression
    : mExpression TERMINATOR
    | declaration
    | declaration expression
        {  $$  = combineExpListAndExp($1,$2) }
    ;

declaration
    : assignment
    ;

assignment
    : identifier '='  mExpression TERMINATOR
       {
           var assignmentNode = new AssignmentNode($2);
           assignmentNode.insertChild($1);
           assignmentNode.insertChild($3);
           $$ = assignmentNode;
       }
    ;

mExpression
    : mExpression '+' mExpression
        {
            var operatorNode = new OperatorNode($2);
            operatorNode.insertChild($1);
            operatorNode.insertChild($3);
            $$ = operatorNode;
        }
    | mExpression '*' mExpression
        {
            var operatorNode = new OperatorNode($2);
            operatorNode.insertChild($1);
            operatorNode.insertChild($3);
            $$ = operatorNode;
        }
    | mExpression '-' mExpression
       {
           var operatorNode = new OperatorNode($2);
           operatorNode.insertChild($1);
           operatorNode.insertChild($3);
           $$ = operatorNode;
       }
    | powerExpression
    |identifier
    | NUMBER
        {$$ = new NumberNode(Number(yytext));}
    ;

powerExpression
    : '(' mExpression '^' mExpression ')'
            {
                var operatorNode = new OperatorNode($3);
                operatorNode.insertChild($2);
                operatorNode.insertChild($4);
                $$ = operatorNode;
            }
    | mExpression '^' mExpression
           {
               var operatorNode = new OperatorNode($2);
               operatorNode.insertChild($1);
               operatorNode.insertChild($3);
               $$ = operatorNode;
           }
    ;

identifier
    : IDENTIFIER
        {$$ = new IdentifierNode(yytext);}
    ;
