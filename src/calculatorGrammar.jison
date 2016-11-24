%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

%{

    var path = require('path');
    var Lib = require(path.resolve('./src/lib.js'));
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
        { return Lib.convertToList($1) }
    ;

expression
    : mExpressions
    | mExpressions expression
        {  $$  = Lib.combineExpListAndExp($1,$2) }
    | declaration
    | declaration expression
        {  $$  = Lib.combineExpListAndExp($1,$2) }
    ;


mExpressions
    : mExpression TERMINATOR
    ;

declaration
    : assignment
    ;

assignment
    : identifier '='  mExpression TERMINATOR
       {
           $$ = Lib.createAssignmentNode($1,$2,$3);
       }
    ;

mExpression
    : mExpression '+' mExpression
        {
            $$ = Lib.createOperatorNode($1,$2,$3);
        }
    | mExpression '*' mExpression
        {
            $$ = Lib.createOperatorNode($1,$2,$3);
        }
    | mExpression '-' mExpression
       {
            $$ = Lib.createOperatorNode($1,$2,$3);
       }
    | powerExpression
    |identifier
    | NUMBER
        {$$ = Lib.createNumberNode(Number(yytext));}
    ;

powerExpression
    : '(' mExpression '^' mExpression ')'
        {
            $$ = Lib.createOperatorNode($2,$3,$4);
        }
    | mExpression '^' mExpression
       {
            $$ = Lib.createOperatorNode($1,$2,$3);
       }
    ;

identifier
    : IDENTIFIER
        {$$ = Lib.createIdentifierNode(yytext);}
    ;
