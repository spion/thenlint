function rmatch(pattern, item) {
    if (typeof(pattern) == 'function') {
        return pattern(item);
    }
    else if (pattern instanceof Array) {
        for (var k = 0; k < pattern.length; ++k) {
            if (rmatch(pattern[k], item)) return true;
        }
        return false;
    }
    else if (typeof(item) == 'string' && pattern 
        && pattern.test && pattern.exec) { 
        return pattern.test(item);
    }
    else if (item === item + 0 && pattern
        && (pattern.lt || pattern.gt || pattern.le
        || pattern.ge)) {
        // item is number and filter contains min-max
        return ((!("lt" in pattern) || item <  pattern.lt)
            &&  (!("gt" in pattern) || item >  pattern.gt)
            &&  (!("le" in pattern) || item <= pattern.le)
            &&  (!("ge" in pattern) || item >= pattern.ge));
    }
    else if (typeof (pattern) === "object" && item) {        
        for (var key in pattern) {
            if (!rmatch(pattern[key], item[key])) {
                return false;
            }
        }
        return true;
    }
    return (pattern == item);
}

module.exports = function match(pattern, item) {
    if (arguments.length == 1) 
        return function match(item) {
            return rmatch(pattern, item);
        } 
    else 
        return rmatch(pattern, item);
    

}
