function functionNode(node) {
    return (node && (node.type == 'FunctionDeclaration'
           || node.type == 'FunctionExpression'));
}


module.exports = function(fn) {
    return   function check(notInOtherFn) {
        // Dont recurse into other functions,
        // they have separate scopes.
        return notInOtherFn._parent == fn
        || !functionNode(notInOtherFn._parent);
    }
}
