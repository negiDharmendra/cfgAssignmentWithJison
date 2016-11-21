%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

%{
    function combineExpListAndExp($1,$2){
        if($1[0].constructor == Array){
            $1.push($2);
            return $1
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
";"                   return ';'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*'
%left '^'
%left '='

%start expression

%% /* language grammar */



expression
    : expression EOF
        {   return $1}
    | assignmentList mExpression
        {   $$ = combineExpListAndExp($1,$2) }
    | assignmentList
    | mExpression
    ;

assignmentList
    :  assignmentList assignment
        {   $$ = combineExpListAndExp($1,$2) }
    | assignment
    ;

assignment
    : identifier '=' mExpressionAssignment
       {$$ = [$2,$1,$3];}
    ;

mExpressionAssignment
    : mExpression ';'
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
