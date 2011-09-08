var VelocityTest = TestCase("VelocityTest");

VelocityTest.prototype.testShouldAddUpVelocities = function() {
    var v1 = new Velocity(2, 1);
    var v2 = new Velocity(4, 2);
    
    var expected = new Velocity(6, 3);
    assertEquals(expected, v1.add(v2));
}

VelocityTest.prototype.testShouldInvertVelocity = function() {
    var v = new Velocity(2, 3);
    
    var expected = new Velocity(-2, -3);
    assertEquals(expected, v.invert());
}

VelocityTest.prototype.testShouldCalculateVectorLength = function() {
    var v = new Velocity(4, 3);
    assertEquals(5, v.len());
}

VelocityTest.prototype.testShouldApplyDotProduct = function() {
    var v1 = new Velocity(4, 3);
    var v2 = new Velocity(2, 2);
    
    assertEquals(14, v1.dot(v2));
}

VelocityTest.prototype.testShouldProvideDivision = function() {
    var v = new Velocity(2, 2);
    var expected = new Velocity(1, 1);
    
    assertEquals(expected, v.div(2));
}

function V(x, y) {
    return new Velocity(x || 0, y || 0);
}
