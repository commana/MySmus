var BoundsTest = TestCase("BoundsTest");

BoundsTest.prototype.setUp = function() {
    this.bounds = new Bounds(0, 0, 10, 10);
}

BoundsTest.prototype.testShouldBeInside = function() {
    var blob = new Blob(new Position(this.bounds.w/2, this.bounds.h/2), null, 0);
    
    assertTrue(this.bounds.isInside(blob));
}

BoundsTest.prototype.testShouldBeOutside = function() {
    var blob = new Blob(new Position(9999999, 9999999));
    
    assertFalse(this.bounds.isInside(blob));
}

BoundsTest.prototype.testShouldBeInsideHorizontalLine = function() {
    var blob1 = new Blob(new Position(this.bounds.x, this.bounds.h/2), null, 0);
    var blob2 = new Blob(new Position(this.bounds.w, this.bounds.h/2), null, 0);
    
    assertTrue(this.bounds.isInside(blob1));
    assertTrue(this.bounds.isInside(blob2));
}

BoundsTest.prototype.testShouldBeInsideVerticalLine = function() {
    var blob1 = new Blob(new Position(this.bounds.w/2, this.bounds.y), null, 0);
    var blob2 = new Blob(new Position(this.bounds.w/2, this.bounds.h), null, 0);
    
    assertTrue(this.bounds.isInside(blob1));
    assertTrue(this.bounds.isInside(blob2));
}

