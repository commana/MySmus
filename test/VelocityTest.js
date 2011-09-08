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
