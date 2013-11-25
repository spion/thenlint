
var through = require('through'),
    falafel = require('falafel'),
    match   = require('./match');

module.exports = function find(content, file) {
    var items = [];
    falafel(content, {range: true, loc: true}, function(node) {
        if (match({
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    property: {
                        type: "Identifier",
                        name: /^(then|spread)$/
                    }
                },
                arguments: {length: 1}
            }
        }, node)) {
            items.push(new NodeFormatter(node.expression.callee.property, file));
        }
    });
    return items;
}

function NodeFormatter(node, file) {
    this.node = node;
    this.file = file;
}

NodeFormatter.prototype.toString = function() {
    return this.file + ': line ' + this.node.loc.start.line 
    + ', col ' + this.node.loc.start.column 
    + ", Missing '.done()' at the end of a promise chain."
}


