var t = require('tap');
var find = require('../lint.js');

var fs = require('fs');
var path = require('path');

t.test('common patterns', function(t) {
    var res = find(fs.readFileSync(
        path.join(__dirname, '..', 'example', 'test.js'), 'utf8'));
    t.equals(res.length, 3);
    t.end();
});

t.test('parse error', function(t) {
    var res = find(fs.readFileSync(
        path.join(__dirname, '..', 'example', 'parse-error.js'), 'utf8'));
    console.log(res[0].toString());
    t.end();
});
