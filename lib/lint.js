var esprima = require('esprima');
var match   = require('./match');
var walk = require('./walk');
var scope = require('./scope');

var bodyWithoutReturn = require('./body-without-return');

var thenOrSpreadMethod = {
    type: "MemberExpression",
    property: {
        type: "Identifier",
        name: /^(then|spread)$/
    }
}
   
module.exports = function find(content, file) {
    var ast, items = []
    try {
        ast = esprima.parse(content, {range: true, loc: true});
    } catch (e) {
        return [new ParseErrorFormatter(e, file)];
    }
    walk(ast, processNode);
    function processNode(node) {
        if (match({
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: thenOrSpreadMethod,
                arguments: {length:1}
            }
        }, node)) {
            items.push(new NodeFormatter(node.expression.callee.property, file));
        }
        else if (match({
            type: "CallExpression",
            callee: thenOrSpreadMethod,
            arguments: {
                0: scope(match({ 
                    type: /^(FunctionExpression|FunctionDeclaration)$/,
                    body: bodyWithoutReturn
                }))
            }
        }, node)) {
            items.push(new MissingReturnFormatter(node.arguments[0], file));
        }
    }
    return items;
}

function hintString(formatter, msg) {
    return formatter.file + ': ' 
        + 'line ' + formatter.node.loc.start.line 
        + ', col ' + formatter.node.loc.start.column
        + ', ' + msg;
}

function NodeFormatter(node, file) {
    this.node = node;
    this.file = file;
}

NodeFormatter.prototype.toString = function() {
    return hintString(this, 
        "Missing '.done()' at the end of a promise chain.")
}

function ParseErrorFormatter(error, file) {
    this.error = error;
    this.file = file;
}

ParseErrorFormatter.prototype.toString = function() {
    return this.file + ': ' + this.error.message;
}

function MissingReturnFormatter(node, file) {
    this.node = node;
    this.file = file;
}

MissingReturnFormatter.prototype.toString = function() {
    return hintString(this, 
        'Function passed to .then contains no return statement');
}


