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

var GameTest = TestCase("GameTest");

GameTest.prototype.setUp = function() {
    this.inputHandler = {process: function(a) {return a; }};
    this.bounds = new AlwaysInsideBounds();
}

GameTest.prototype.testShouldReturnNewBlobs = function() {
    var blob1 = new SpyBlob();
    var blob2 = new SpyBlob();
    
    var spyCollision = new SpyCollision();
    var oldWorld = new Game([blob1, blob2], null, spyCollision, new NullGameState);
    var newWorld = oldWorld.advance(this.inputHandler);
    
    assertEquals([blob1.state, blob2.state], newWorld.blobs);
}

GameTest.prototype.testShouldInitiateCollisionCheck = function() {
    var blob1 = new Blob(P(), V(), 0);
    var blob2 = new Blob(P(), V(), 0);
    
    var spyCollision = new SpyCollision();
    var oldWorld = new Game([blob1, blob2], this.bounds, spyCollision, new NullGameState);
    oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertTrue(spyCollision.called);
}

GameTest.prototype.testShouldRemoveMasslessBlobs = function() {
    var blob1 = new Blob(P(), V(), 0);
    var blob2 = new Blob(P(), V(), 0);
    
    var oldWorld = new Game([blob1, blob2], this.bounds, new SpyCollision(), new NullGameState);
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertEquals([], newWorld.blobs);
}

GameTest.prototype.testShouldTransitionState = function() {
    var spyGameState = new SpyGameState();
    var world = new Game([], this.bounds, new SpyCollision(), spyGameState);
    world.advance(this.inputHandler, new GameTime(1, 1));
    
    assertTrue(spyGameState.called);
}

var SpyBlob = function() {
    this.state = {};
}
SpyBlob.prototype.moveInside = function() {
    return this.state = {
        collidesWith: function() {},
        mass: function() { return 100; }
    };
}

var SpyCollision = function() {
    this.called = false;
}
SpyCollision.prototype.perform = function(blobs) {
    this.called = true;
    return blobs;
}

var NullGameState = function() {
    this.transition = function (blobs) { return this; };
}

var SpyGameState = function() {
    this.called = false;
    this.transition = function (blobs) { this.called = true; return this; };
}
