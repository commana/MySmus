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
