
var evalScheem = function (expr, env) {
    // make env optional
    if (!env) {
        env = {};
    }

    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }

    // Strings are variable references
    if (typeof expr === 'string') {
        return env[expr];
    }

    // Look at head of list for operation
    switch (expr[0]) {
        // operands
        case '+':
            return evalScheem(expr[1], env) +
                   evalScheem(expr[2], env);
        case '-':
            return evalScheem(expr[1], env) -
                   evalScheem(expr[2], env);
        case '*':
            return evalScheem(expr[1], env) *
                   evalScheem(expr[2], env);
        case '/':
            return evalScheem(expr[1], env) /
                   evalScheem(expr[2], env);
        // quote
        case 'quote':
            return expr[1];
        // define, set!, begin
        case 'define':
        case 'set!':
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;                   
        case 'begin':
            var i, result;
            for(i = 1; i < expr.length; i++) {
                result = evalScheem(expr[i], env);
            }
            return result;
        // list handling
        case 'cons':
            var list = evalScheem(expr[2], env);
            var value = evalScheem(expr[1], env);
            list.splice(0, 0, value);
            return list;
        case 'car':
            var listC = evalScheem(expr[1], env);
            return listC[0];
        case 'cdr':
            var listR = evalScheem(expr[1], env);
            listR.shift();
            return listR;                        
    }            
   
};

exports.evalScheem = evalScheem;