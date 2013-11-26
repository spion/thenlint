var assert = require('assert');
var walk = require('./walk');
var bindings = require('episcope/bindings');

function functionNode(node) {
    return (node.type == 'FunctionDeclaration'
           || node.type == 'FunctionExpression');
}

function lookup(id) {
    var fn = id;
    while (fn) {
        if (!functionNode(fn)) {
            fn = fn._parent;
            continue;
        }       
        if (!fn.bindings) 
            fn.bindings = bindings(fn)       
        for (var k = 0; k < fn.bindings.length; ++k) {
            if (fn.bindings[k].name == id.name) {
                return valueOfId(id, fn);
            }
        }
        fn = fn._parent;
    }
}

function valueOfId(id, fn) {
    var found;
    walk(fn.body, function(notOtherFn) {
        // Dont recurse into other functions,
        // they have separate scopes.
        return notOtherFn._parent === fn
            || !functionNode(notOtherFn._parent);
    }, function walker(expr) {
        if (expr.type === 'VariableDeclarator'
            && expr.id.name === id.name) {
            found = expr.init;
        }
        else if (expr.type === 'FunctionDeclaration'
                 && expr.id && expr.id.name === id.name) {
             found = expr;
        }
    });
    if (found) {
    }
    return found;
}

module.exports = function scope(fn) {
    return function indirection(node) {
        if (fn(node)) return true;
        else if (node.type == 'Identifier') {
            var actual = lookup(node);
            var val = fn(actual);
            return val;
        }        
    }
}

