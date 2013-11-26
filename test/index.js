var t = require('tap');
var find = require('../lib/lint.js');

var fs = require('fs');
var path = require('path');

t.test('common patterns', function(t) {
    var res = find(fs.readFileSync(
        path.join(__dirname, '..', 'example', 'test.js'), 'utf8'));
    t.equals(res.length, 5);
    t.end();
});

t.test('parse error', function(t) {
    var res = find(fs.readFileSync(
        path.join(__dirname, '..', 'example', 'parse-error.js'), 'utf8'));
    console.log(res[0].toString());
    t.end();
});

t.test('return within then', function(t) {
    var res = find('x.then(function(val) { var x = val; f(x); }).done();');
    t.equals(res.length, 1, 'should detect basic case');
    t.end();
});

var advanced_broken_chain = fs.readFileSync(
    path.join(__dirname, '..', 'example', 'broken-chains.js'));

t.test('complex return within then', function(t) {
    var res = find(advanced_broken_chain);
    t.equals(res.length, 2, 'should detect advanced broken chain');
    t.end();
});


