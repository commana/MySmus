var PositionTest = TestCase("PositionTest");

PositionTest.prototype.testShouldApplyVelocity = function() {
    var p = P();
    var v = new Velocity(2, 1);
    
    assertEquals(P(2, 1), p.applyVelocity(v, new GameTime(1, 1)));
}

PositionTest.prototype.testShouldComputeDistance = function() {
    var p1 = P(1, 1);
    var p2 = P(3, 3);
    
    assertTrue(Math.abs(p1.distanceTo(p2) - 2.82) < 0.01);
}

function P(x, y) {
    return new Position(x || 0, y || 0);
}
