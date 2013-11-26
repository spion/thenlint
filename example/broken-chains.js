
function y() {}

function easy(x) {
    return x.then(function(z) {
        y(z);
    });
}

function easy_ok(x) {
    return x.then(function(val) {
        return 1;
    });
}

function medium(x) {
    return x.then(function(val) {
        var a = 1;
        function n() {
            return a + val;
        }
        n();
    })
}


function medium_ok(x) {
    return x.then(function(val) {
        var a = 1;
        function n() {
            return a + val;
        }
        var res = n();
        if (res) { 
            return res;
        }
        else {
            return res + 1000;
        }
    })
}


function hard(x) {
    return x.then(function hard_then(val) {
        var a = 1;
        function n_bad() {
            // forgot to return
            var z = a + val;
        }
        return a.then(n_bad);
    });
}

function hard_ok(x) {
    return x.then(function hard_ok_then(val) {
        var a = 1;
        function n_ok() {
            var z = a + val;
            return z;
        }
        return a.then(n_ok);
    })
}


