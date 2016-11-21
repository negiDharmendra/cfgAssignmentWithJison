%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

%{
    function combineExpListAndExp($1,$2){
        if($2[0].constructor == Array){
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
        {   return $1}
    ;

expression
    : mExpression TERMINATOR
    | declaration
    | declaration expression
        {   $$  = combineExpListAndExp($1,$2) }
    ;

declaration
    : assignment
    ;

assignment
    : identifier '='  mExpression TERMINATOR
       {$$ = [$2,$1,$3];}
    ;

mExpression
    : mExpression '+' mExpression
        {$$ = [$2,$1,$3];}
    | mExpression '*' mExpression
        {$$ = [$2,$1,$3];}
    | mExpression '-' mExpression
        {$$ = [$2,$1,$3];}
    | powerExpression
    |identifier
    | NUMBER
        {$$ = Number(yytext)}
    ;

powerExpression
    : '(' mExpression '^' mExpression ')'
            {$$ = [$3,$2,$4];}
    | mExpression '^' mExpression
            {$$ = [$2,$1,$3];}
    ;

identifier
    : IDENTIFIER
        {$$ = yytext}
    ;
