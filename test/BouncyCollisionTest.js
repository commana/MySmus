var BouncyCollisionTest = TestCase("BouncyCollisionTest");

BouncyCollisionTest.prototype.testCollisionShouldTransferVelocity = function() {
    var v10   = new Velocity(10, 0);
    var v0    = new Velocity(0, 0);
    var blob1 = new Blob(new Position(0, 0), v0,  1);
    var blob2 = new Blob(new Position(0, 0), v10, 1);
    
    var bouncyCollision = new BouncyCollision();
    var collidedBlobs   = bouncyCollision.handle(blob1, blob2);
    
    assertEquals(v10, collidedBlobs[0].velocity);
    assertEquals(v0,  collidedBlobs[1].velocity);
}
