var BouncyBoundsTest = TestCase("BouncyBoundsTest");

BouncyBoundsTest.prototype.setUp = function() {
    this.bounds     = new BouncyBounds(0, 0, 640, 480);
    this.positions  = this.createPositions();
    this.velocities = this.createVelocities();
}

BouncyBoundsTest.prototype.testShouldInheritIsInsideFunction = function() {
    var blob1 = new Blob(new Position(this.bounds.w/2, this.bounds.h/2));
    var blob2 = new Blob(new Position(999999, 999999));
    
    assertTrue(this.bounds.isInside(blob1));
    assertFalse(this.bounds.isInside(blob2));
}

BouncyBoundsTest.prototype.testShouldBounceAtTopAndBottom = function() {
    var blob1 = new Blob(this.positions.outsideTop,    this.velocities.up);
    var blob2 = new Blob(this.positions.outsideBottom, this.velocities.down);
    
    var actualBlob1 = this.bounds.handleOutside(blob1);
    var actualBlob2 = this.bounds.handleOutside(blob2);
    
    assertEquals(this.velocities.down, actualBlob1.velocity);
    assertEquals(this.velocities.up,   actualBlob2.velocity);
}

BouncyBoundsTest.prototype.testShouldBounceAtLeftAndRight = function() {
    var blob1 = new Blob(this.positions.outsideLeft,  this.velocities.left);
    var blob2 = new Blob(this.positions.outsideRight, this.velocities.right);
    
    var actualBlob1 = this.bounds.handleOutside(blob1);
    var actualBlob2 = this.bounds.handleOutside(blob2);
    
    assertEquals(this.velocities.right, actualBlob1.velocity);
    assertEquals(this.velocities.left,  actualBlob2.velocity);
}

BouncyBoundsTest.prototype.testShouldGetDeflectedInBottomRightCorner = function() {
    var bottomRight = new Position(this.bounds.w+1, this.bounds.h+1);
    var blob        = new Blob(bottomRight, this.velocities.downRight);
    
    var actual   = this.bounds.handleOutside(blob);
    var expected = new Blob(bottomRight, this.velocities.upLeft);
    
    assertEquals(expected, actual);
}

BouncyBoundsTest.prototype.testShouldRepositionAwayFromBorder = function() {
    var radius = 10;
    var left = new Blob(new Position(0, this.bounds.h/2), this.velocities.zero, radius);
    var right = new Blob(new Position(this.bounds.w, this.bounds.h/2), this.velocities.zero, radius);
    var top = new Blob(new Position(this.bounds.w/2, this.bounds.y), this.velocities.zero, radius);
    var bottom = new Blob(new Position(this.bounds.w/2, this.bounds.h), this.velocities.zero, radius);
    
    var actualLeft   = this.bounds.handleOutside(left);
    var expectedLeft = new Position(radius, this.bounds.h/2);
    
    var actualRight   = this.bounds.handleOutside(right);
    var expectedRight = new Position(this.bounds.w - radius, this.bounds.h/2);
    
    var actualTop   = this.bounds.handleOutside(top);
    var expectedTop = new Position(this.bounds.w/2, radius);
    
    var actualBottom   = this.bounds.handleOutside(bottom);
    var expectedBottom = new Position(this.bounds.w/2, this.bounds.h - radius);
    
    assertEquals(expectedLeft, actualLeft.position);
    assertEquals(expectedRight, actualRight.position);
    assertEquals(expectedTop, actualTop.position);
    assertEquals(expectedBottom, actualBottom.position);
}




BouncyBoundsTest.prototype.createPositions = function() {
    return {
        outsideTop:    new Position(this.bounds.w/2, this.bounds.y-100),
        outsideBottom: new Position(this.bounds.w/2, this.bounds.h+100),
        outsideLeft:   new Position(this.bounds.x-100, this.bounds.h/2),
        outsideRight:  new Position(this.bounds.w+100, this.bounds.h/2),
    };
}

BouncyBoundsTest.prototype.createVelocities = function() {
    return {
        up:        new Velocity(0, -10),
        down:      new Velocity(0, 10),
        left:      new Velocity(-10, 0),
        right:     new Velocity(10, 0),
        
        upLeft:    new Velocity(-10, -10),
        upRight:   new Velocity(10, -10),
        downLeft:  new Velocity(-10, 10),
        downRight: new Velocity(10, 10),
        
        zero:      new Velocity(0, 0),
    };
}
