var CollisionTest = TestCase("CollisionTest");

CollisionTest.prototype.setUp = function() {
    this.collision = new Collision();
}

CollisionTest.prototype.testCollisionsShouldPreserveBlobCount = function() {
    var blobs = [
        new Blob(new Position(0, 0), new Velocity(0, 0), 0),
        new Blob(new Position(0, 0), new Velocity(0, 0), 0),
        new Blob(new Position(0, 0), new Velocity(0, 0), 0),
        new Blob(new Position(0, 0), new Velocity(0, 0), 0),
    ];
    
    var newBlobs = this.collision.perform(blobs);
    
    assertEquals(blobs.length, newBlobs.length);
}

CollisionTest.prototype.testShouldCollisionCheckAllBlobsWithEachOther = function() {
    var p1 = new Position(999, 888);
    var p2 = new Position(0, 0);
    var blobs = [
        BlobProbe(1),
        BlobProbe(2),
        BlobProbe(3),
        BlobProbe(4)
    ];
    
    this.collision.perform(blobs);
    
    assertEquals([2,3,4], blobs[0].collisionChecks);
    assertEquals([3,4],   blobs[1].collisionChecks);
    assertEquals([4],     blobs[2].collisionChecks);
    assertEquals([],      blobs[3].collisionChecks);
}

var BlobProbe = function(id) {
    var comparedWith = [];
    return {
        id: id,
        moveInside: function() { return this; },
        collidesWith: function(blob) { comparedWith.push(blob.id); return true; },
        collisionChecks: comparedWith,
    }
}
