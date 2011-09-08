function Collision() {}

Collision.prototype.perform = function(blobs) {
    var handledIndices = [];
    for (var i = 0; i < blobs.length; i++) {
        var a = blobs[i];
        for (var j = 0; j < blobs.length; j++) {
            var b = blobs[j];
            
            if (a === b) continue;
            // Don't handle already collided pairs:
            // Skip (j,i) if (i,j) has been checked already.
            if (handledIndices.indexOf(j) !== -1) continue;
            handledIndices.push(i);
            
            if (a.collidesWith(b)) {
                var collisionPair = this.handle(a, b);
                blobs[i] = collisionPair[0];
                blobs[j] = collisionPair[1];
            }
        }
    }
    return blobs;
}

Collision.prototype.handle = function(blob1, blob2) {
    return [blob1, blob2];
}

