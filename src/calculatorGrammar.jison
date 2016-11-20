%token IDENTIFIER

/* description: Parses and executes mathematical expressions. */

%{

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
    | assignmentList
    | mExpression
    ;

assignmentList
    :  assignmentList assignment
        {   if($1[0].constructor == Array) {$1.push($2); }
            else $$ = [$1,$2];
        }
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
    | identifier
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
    : identifier '=' assignmentList
       {    console.log("identifier--->",JSON.stringify($3))
            if($3[0].constructor == Array) {
                $$ = [[$2, $1, $3.shift()]];
                for(var d in $3)
                    $$.push($3[d])
             }
             else
                $$ = [$2, $1, $3];

        }
    | IDENTIFIER
        {$$ = yytext}
    ;
