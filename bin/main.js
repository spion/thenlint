#!/usr/bin/env node

var argv = require('optimist')
            .usage('Usage: $0 <file.js> [<other.js> ...]')
            .demand(1)
            .argv;

var fs = require('fs');

var find = require('../lib/lint.js');

var glob = require('multi-glob').glob;

glob(argv._, function(err, files) {
    var errors = files.reduce(function(acc, filename) {
        var content;
        try { content = fs.readFileSync(filename, 'utf8')  }
        catch (e) { return acc; }
        return acc.concat(find(content, filename)
                .map(function(x) { return x.toString(); }));
    }, []);
    var report = errors.join('\n');
    console.log(report);
    if (errors.length > 0)
        process.exit(1)
});


