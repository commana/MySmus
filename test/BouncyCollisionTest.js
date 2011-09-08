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
