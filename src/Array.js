Array.prototype.cartesianProduct = function(other) {
    var result = [];
    var index  = 0;
    
    for (var i = 0; i < this.length; i++) {
        var a = this[i];
        for (var j = 0; j < other.length; j++) {
            var b = other[j];
            result[index++] = [a, b];
        }
    }
    return result;
}

Array.prototype.pairs = function() {
    var pairs = [];
    var index = 0;
    
    for (var i = 0; i  < this.length; i++) {
        var a = this[i];
        for (var j = i+1; j < this.length; j++) {
            var b = this[j];
            pairs[index++] = [a, b];
        }
    }
    return pairs;
}

Array.prototype.mass = function() {
    return this.reduce(function(acc, blob) {
        return acc + blob.mass();
    }, 0);
}
