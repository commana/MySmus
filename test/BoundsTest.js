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

