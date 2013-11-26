var walk = require('./walk');
var match = require('./match');

function functionType(node) {
    return (node.type == 'FunctionExpression'
            || node.type == 'FunctionDeclaration') 

}

function firstFunctionParent(fn) {
    return function checkFirstFunction(node) {
        var p = node;
        while (p) {
            if (p === fn) 
                return true;
            else if (functionType(p))
                return false;
            p = p._parent;
        }
        return false;
    }
}

module.exports = function bodyWithoutReturn(fn) {
    var found = false;
    walk(fn, function(node) {
        if (match({
            type: 'ReturnStatement',
            _parent: firstFunctionParent(fn)
        }, node)) 
        found = true;
    })
    return !found;
}


