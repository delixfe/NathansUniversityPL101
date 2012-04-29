
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
    }            
   
};

exports.evalScheem = evalScheem;