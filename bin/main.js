#!/usr/bin/env node

var argv = require('optimist')
            .usage('Usage: $0 <file.js> [<other.js> ...]')
            .demand(1)
            .argv;

var fs = require('fs');

var find = require('../lib/lint.js');

var glob = require('multi-glob').glob;

glob(argv._, function(err, files) {    
    var report = files.reduce(function(acc, filename) {
        return acc.concat(find(fs.readFileSync(filename, 'utf8'), filename)
                .map(function(x) { return x.toString(); }));
    }, []).join('\n');
    console.log(report);
});


