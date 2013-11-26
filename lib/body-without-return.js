var walk = require('./walk');
var match = require('./match');

var notIntoFunctions = require('./without-depth');

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

var util = require('util');

module.exports = function bodyWithoutReturn(body) {
    var found = false;
    var notIntoOtherFunctions = notIntoFunctions(body._parent);
    walk(body, notIntoOtherFunctions, function(node) {
        if (match({
            type: 'ReturnStatement'
        }, node)) found = node;         
    })
    return !found;
}


