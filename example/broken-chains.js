
function y() {}

function easy(x) {
    return x.then(function(z) {
        y(z);
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

function hard(x) {
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

