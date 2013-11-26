
function chained(first) {
    return first.then(function first_then(first_then_arg) {
        console.log(first_then_arg + 1);
    }).then(function second_then(second_then_arg) {
        return second_then_arg;
    });
   
}


