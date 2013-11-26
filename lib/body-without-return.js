var walk = require('./walk');
var match = require('./match');

function firstFunction(fn) {
    return function checkFirstFunction(node) {
        if (node == fn) return true;
        else if (node.type == 'FunctionExpression'
                || node.type == 'FunctionDeclaration') 
            return false;
        else if (!node.parent) return false;
        else
            return checkFirstFunction(node.parent);        

    };
}

module.exports = function bodyWithoutReturn(fn) {
    var found = false;
    walk(fn, function(node) {
        if (match({
            type: 'ReturnStatement',
            parent: firstFunction(fn)
        }, node)) 
            found = true;
    })
    return !found;
}


