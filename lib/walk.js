function forEach(xs, fn) {    
    if (xs.forEach) return xs.forEach(fn);
    for (var i = 0; i < xs.length; i++) {
        fn.call(xs, xs[i], i, xs);
    }
}

var objectKeys = Object.keys;

function rwalk (node, parent, fn) {
    node.parent = parent;

    forEach(objectKeys(node), function (key) {
        if (key === 'parent') return;

        var child = node[key];
        if (Array.isArray(child)) {
            forEach(child, function (c) {
                if (c && typeof c.type === 'string') {
                    rwalk(c, node, fn);
                }
            });
        }
        else if (child && typeof child.type === 'string') {
            child.parent = node;
            rwalk(child, node, fn);
        }
    });
    fn(node);
}

module.exports = function walk(node, fn) {
    rwalk(node, undefined, fn);
}

