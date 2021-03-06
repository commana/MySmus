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
