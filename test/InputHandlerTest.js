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

var InputHandlerTest = TestCase("InputHandlerTest");

InputHandlerTest.prototype.testShouldCreateOneBlobPerClickOfPlayer = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0));
    var click1 = { position: new Position(20, 20), player: player };
    var click2 = { position: new Position(20, 20), player: player };
    
    var input = new InputHandler([click1, click2]);
    var blobs = input.process([blob]);
    
    assertEquals(3, blobs.length);
}

InputHandlerTest.prototype.testShouldOnlyAcceptClicksNearBlob = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0), 0);
    var ok = { position: new Position(49, 0), player: player };
    var tooFar = { position: new Position(50, 0), player: player };
    
    var input = new InputHandler([ok, tooFar]);
    var blobs = input.process([blob]);
    
    assertEquals(2, blobs.length);
}

InputHandlerTest.prototype.testShouldOnlyAcceptClicksOutsideBlob = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0), 10);
    var ok = { position: new Position(11, 0), player: player };
    var tooNear = { position: new Position(5, 0), player: player };
    
    var input = new InputHandler([ok, tooNear]);
    var blobs = input.process([blob]);
    
    assertEquals(2, blobs.length);
}

InputHandlerTest.prototype.testClickAreaShouldExpandWithBlobRadius = function() {
    var player1 = 1;
    var player2 = 2;
    
    var blob1 = new PlayerBlob(player1, new Position(0, 0), new Velocity(0, 0), 10);
    var blob2 = new PlayerBlob(player2, new Position(0, 0), new Velocity(0, 0), 50);
    
    var click1 = { position: new Position(40, 0), player: player1 };
    var click2 = { position: new Position(99, 0), player: player2 };
    
    var input = new InputHandler([click1, click2]);
    var blobs = input.process([blob1, blob2]);
    
    assertEquals(4, blobs.length);
}

InputHandlerTest.prototype.testShouldNotCreateBlobsIfPlayerIsNotPresent = function() {
    var player = 1;
    
    var blobs = [
        new PlayerBlob(8888, new Position(0, 0), new Velocity(0, 0)),
        new PlayerBlob(9999, new Position(0, 0), new Velocity(0, 0)),
    ];
    var click1 = { position: new Position(10, 10), player: player };
    var click2 = { position: new Position(20, 20), player: player };
    
    var input = new InputHandler([click1, click2]);
    var newBlobs = input.process(blobs);
    
    assertEquals(blobs, newBlobs);
}

InputHandlerTest.prototype.testCreatedBlobShouldHaveAngleVelocity = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0), 10);
    var click = { position: new Position(0, 30), player: player };
    
    var input = new InputHandler([click]);
    var blobs = input.process([blob]);
    
    assertTrue(blobs[1].velocity.x > 0);
    assertTrue(blobs[1].velocity.y > 0);
}

InputHandlerTest.prototype.testShouldAddJetForceToBlob = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0), 10);
    var click = { position: new Position(0, 30), player: player };
    
    var input = new InputHandler([click]);
    var blobs = input.process([blob]);
    
    assertTrue(blobs[0].velocity.x < 0);
    assertTrue(blobs[0].velocity.y < 0);
}

InputHandlerTest.prototype.testShouldRemoveEjectedMassFromBlob = function() {
    var player = 1;
    
    var blob = new PlayerBlob(player, new Position(0, 0), new Velocity(0, 0), 10);
    var click = { position: new Position(0, 30), player: player };
    
    var input = new InputHandler([click]);
    var blobs = input.process([blob]);
    
    assertTrue(blob.mass() > blobs[0].mass());
}
