function forEach(xs, fn) {    
    if (xs.forEach) return xs.forEach(fn);
    for (var i = 0; i < xs.length; i++) {
        fn.call(xs, xs[i], i, xs);
    }
}

var objectKeys = Object.keys;

function defineParent(node, parent) {
    if (!node._parent) Object.defineProperty(node, '_parent', {
        value: parent,
        writeable: false,
        configurable: false,
        enumerable: false
    });
}

function rwalk (node, parent, pre, post) {
    defineParent(node, parent);
    if (!pre(node)) return;

    forEach(objectKeys(node), function (key) {

        var child = node[key];
        if (Array.isArray(child)) {
            forEach(child, function (c) {
                if (c && typeof c.type === 'string') {
                    rwalk(c, node, pre, post);
                }
            });
        }
        else if (child && typeof child.type === 'string') {
            rwalk(child, node, pre, post);
        }
    });
    post(node);
}

function identity() { return true; }

module.exports = function walk(node, pre, post) {
    if (!post) {
        post = pre;
        pre = identity;
    }
    rwalk(node, undefined, pre, post);
}

