/*
 * Copyright 2011 Christoph Thelen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
