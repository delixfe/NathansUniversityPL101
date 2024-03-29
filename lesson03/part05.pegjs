start =
    program 

validchar
    = [0-9a-zA-Z_?!+-=@#$%^&*/.]

atom =
    whitespace chars:validchar+ whitespace 
        { return chars.join(""); }

whitespace = 
    [ ]* { return ""; }

innerExpression =
    (atom:atom {return atom;} / expression:expression {return expression;})

expression =
    [(] innerExpression:innerExpression* [)] {return innerExpression; }

program = 
    atom / expression