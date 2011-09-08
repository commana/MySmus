var BlobTest = TestCase("BlobTest");

BlobTest.prototype.setUp = function() {
    this.unityGameTime = new GameTime(1, 1);
}

BlobTest.prototype.testShouldNotMoveBlobWithoutVelocity = function() {
    var origin = new Position(0, 0);
    var velocity = new Velocity(0, 0);
    
    var prev = new Blob(origin, velocity);
    var next = prev.moveInside(new AlwaysInsideBounds(), this.unityGameTime);
    
    assertEquals(prev, next);
}

BlobTest.prototype.testShouldMoveAccordingToVelocity = function() {
    var prev = new Blob(new Position(0, 0), new Velocity(2, 1));
    var next = prev.moveInside(new AlwaysInsideBounds(), this.unityGameTime);
    
    var expected = new Blob(new Position(2, 1), new Velocity(2, 1));
    assertEquals(expected, next);
}

BlobTest.prototype.testShouldCallFunctionIfOutsideBounds = function() {
    var blob   = new Blob(new Position(0, 0), new Velocity(9999, 9999));
    var bounds = new AlwaysOutsideBounds();
    
    blob.moveInside(bounds, this.unityGameTime);
    
    assertTrue(bounds.called);
}

BlobTest.prototype.testShouldReturnCustomBlobIfOutsideBounds = function() {
    var blob   = new Blob(new Position(0, 0), new Velocity(9999, 9999));
    var bounds = new AlwaysOutsideBounds();
    
    var actual = blob.moveInside(bounds, this.unityGameTime);
    
    assertEquals(bounds.state, actual);
}

BlobTest.prototype.testShouldCheckBoundsOnAlreadyMovedBlob = function() {
    var blob   = new Blob(new Position(0, 0), new Velocity(9999, 9999));
    var bounds = new Bounds(0, 0, 10, 10);
    
    var actual = blob.moveInside(bounds, this.unityGameTime);
    var wrongResult = new Blob(new Position(9999, 9999), new Velocity(9999, 9999));
    
    assertNotEquals(wrongResult, actual);
}

BlobTest.prototype.testCollisionsShouldBeDetected = function() {
    var blob1 = new Blob(new Position(0, 0), new Velocity(0, 0), 0);
    var blob2 = new Blob(new Position(0, 0), new Velocity(0, 0), 0);
    
    assertTrue(blob1.collidesWith(blob2));
}

BlobTest.prototype.testDistantBlobsShouldNotCollide = function() {
    var blob1 = new Blob(new Position(0, 0), new Velocity(0, 0), 0);
    var blob2 = new Blob(new Position(999, 999), new Velocity(0, 0), 0);
    
    assertFalse(blob1.collidesWith(blob2));
}

BlobTest.prototype.testShouldUseRadiusInCollisionDetection = function() {
    var blob1 = new Blob(new Position(0, 0), new Velocity(0, 0), 0);
    var blob2 = new Blob(new Position(1, 1), new Velocity(0, 0), 20);
    
    assertTrue(blob1.collidesWith(blob2));
}




var AlwaysOutsideBounds = function() {
    this.called = false;
    this.state = {};
}
AlwaysOutsideBounds.prototype.isInside = function(blob) {
    return false;
}
AlwaysOutsideBounds.prototype.handleOutside = function(blob) {
    this.called = true;
    return this.state = { handled: true };
}

var AlwaysInsideBounds = function() {}
AlwaysInsideBounds.prototype.isInside = function(blob) {
    return true;
}
