start =
    program 

validchar
    = [0-9a-zA-Z_?!+-=@#$%^&*/.]

atom =
    whitespace chars:validchar+ whitespace 
        { return chars.join(""); }

whitespace = 
    [ \n\t]* { return ""; }

innerExpression =
    (atom:atom {return atom;} / expression:expression {return expression;})

expression =
    whitespace [(] whitespace innerExpression:innerExpression* whitespace [)] whitespace  {return innerExpression; }

program = 
    atom / expression