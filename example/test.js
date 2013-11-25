

function f1() {
    x.then(function(y) {
        console.log("Hi");
    });
}

function f2() {
    x.spread(function(y, z) {
        console.log("Hi", z);
    });
}

function f3() {
    x.then(y)
     .then(z);

    a.then(b)
     .done(c);
}
