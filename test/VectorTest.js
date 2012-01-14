/*
 * Copyright 2011, 2012 Christoph Thelen
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

var VectorTest = TestCase("VectorTest");

VectorTest.prototype.testShouldAddUpVelocities = function() {
    var v1 = new Vector(2, 1);
    var v2 = new Vector(4, 2);
    
    var expected = new Vector(6, 3);
    assertEquals(expected, v1.add(v2));
}

VectorTest.prototype.testShouldInvertVector = function() {
    var v = new Vector(2, 3);
    
    var expected = new Vector(-2, -3);
    assertEquals(expected, v.invert());
}

VectorTest.prototype.testShouldCalculateVectorLength = function() {
    var v = new Vector(4, 3);
    assertEquals(5, v.len());
}

VectorTest.prototype.testShouldApplyDotProduct = function() {
    var v1 = new Vector(4, 3);
    var v2 = new Vector(2, 2);
    
    assertEquals(14, v1.dot(v2));
}

VectorTest.prototype.testShouldProvideDivision = function() {
    var v = new Vector(2, 2);
    var expected = new Vector(1, 1);
    
    assertEquals(expected, v.div(2));
}

VectorTest.prototype.testShouldSubtractVector = function() {
    var a = new Vector(1, 2);
    var b = new Vector(3, 4);
    var e = new Vector(-2, -2);
    
    assertEquals(e, a.sub(b));
}

function V(x, y) {
    return new Vector(x || 0, y || 0);
}
