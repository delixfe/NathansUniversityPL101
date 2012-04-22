start =
   program 

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    whitespaces chars:validchar+ whitespaces 
        { return chars.join(""); }

lineTerminator = 
       "\n"
     / "\r\n"
     / "\r"

whitespace = 
    " "
    / "\t"
    / "\v"
    / "\f"
    
comment = 
    lineTerminator ";;" (!lineTerminator .)*

whitespaces = 
    (comment
    / whitespace
    / lineTerminator)*

innerExpression =
    atom:atom whitespaces  {return atom;} 
    / whitespaces expression:expression whitespaces {return expression;}

expression =
   quotedExpression 
   / whitespaces  "(" whitespaces innerExpression:innerExpression* ")" whitespaces {return innerExpression; }

quotedExpression = 
    whitespaces ['][(]whitespaces innerExpression:innerExpression* whitespaces [)] { return ["quote",innerExpression]; }

program = 
    atom / expression