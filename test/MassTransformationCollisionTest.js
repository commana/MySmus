var MassTransformationCollisionTest = TestCase("MassTransformationCollisionTest");

MassTransformationCollisionTest.prototype.testShouldTransferMassOfSmallerBlob = function() {
    var smaller = new Blob(new Position(0, 0), new Velocity(0, 0), 10);
    var bigger  = new Blob(new Position(0, 0), new Velocity(0, 0), 20);
    
    var collision = new MassTransformationCollision();
    var blobsAfter1 = collision.handle(smaller, bigger);
    var blobsAfter2 = collision.handle(bigger, smaller);
    
    assertEquals(smaller.mass() - 1, blobsAfter1[0].mass());
    assertEquals(bigger.mass()  + 1, blobsAfter1[1].mass());
    
    assertEquals(smaller.mass() - 1, blobsAfter2[1].mass());
    assertEquals(bigger.mass()  + 1, blobsAfter2[0].mass());
}

MassTransformationCollisionTest.prototype.testShouldCallAddOnColliderOnEqualMasses = function() {
    var blob = new Blob(new Position(0, 0), new Velocity(0, 0), 10);
    
    var addon = { returnValue: 1234, handle: function() { return this.returnValue; } };
    var collision = new MassTransformationCollision(addon);
    
    var actual = collision.handle(blob, blob);
    
    assertEquals(addon.returnValue, actual);
}

MassTransformationCollisionTest.prototype.testShouldUseBouncyCollisionAsDefaultAddon = function() {
    var blob = new Blob(new Position(0, 0), new Velocity(10, 10), 10);
    
    var collision = new MassTransformationCollision();
    var actual = collision.handle(blob, blob);
    
    assertNotEquals(blob, actual[0]);
    assertNotEquals(blob, actual[1]);
}
