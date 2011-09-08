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

var GameStateTest = TestCase("GameStateTest");

GameStateTest.prototype.setUp = function() {
    this.inputHandler = {process: function(a) {return a; }};
    this.bounds = new AlwaysInsideBounds();
}

GameStateTest.prototype.testShouldReturnNewBlobs = function() {
    var blob1 = new SpyBlob();
    var blob2 = new SpyBlob();
    
    var spyCollision = new SpyCollision();
    var oldWorld = new GameState([blob1, blob2], null, spyCollision);
    var newWorld = oldWorld.advance(this.inputHandler);
    
    assertEquals([blob1.state, blob2.state], newWorld.blobs);
}

GameStateTest.prototype.testShouldInitiateCollisionCheck = function() {
    var blob1 = new Blob(P(), V(), 0);
    var blob2 = new Blob(P(), V(), 0);
    
    var spyCollision = new SpyCollision();
    var oldWorld = new GameState([blob1, blob2], this.bounds, spyCollision);
    oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertTrue(spyCollision.called);
}

GameStateTest.prototype.testShouldRemoveMasslessBlobs = function() {
    var blob1 = new Blob(P(), V(), 0);
    var blob2 = new Blob(P(), V(), 0);
    
    var oldWorld = new GameState([blob1, blob2], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertEquals([], newWorld.blobs);
}

GameStateTest.prototype.testShouldGoInLosingStateIfNoPlayerBlobPresent = function() {
    var blob1 = new Blob(P(), V());
    var blob2 = new Blob(P(), V());
    
    var oldWorld = new GameState([blob1, blob2], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertInstanceOf(LosingGameState, newWorld);
}

GameStateTest.prototype.testShouldGoInLosingStateIfNonPlayerBlobIsTooBig = function() {
    var player = new PlayerBlob(1, P(), V(), 1);
    var big    = new Blob(P(15, 0), V(), 2);
    var tooBig = new Blob(P(30, 0), V(), 4);
    
    var oldWorld = new GameState([player, big, tooBig], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertInstanceOf(LosingGameState, newWorld);
}

GameStateTest.prototype.testShouldGoInWinningStateIfPlayerIsTooBig = function() {
    var player  = new PlayerBlob(1, P(0, 0), V(), 4);
    var small   = new Blob(P(15, 0), V(), 2);
    var smaller = new Blob(P(30, 0), V(), 1);
    
    var oldWorld = new GameState([player, small, smaller], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertInstanceOf(WinningGameState, newWorld);
}

GameStateTest.prototype.testShouldDefaultToLosingStateIfNoBlobs = function() {
    var oldWorld = new GameState([], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertInstanceOf(LosingGameState, newWorld);
}

GameStateTest.prototype.testShouldGoInLosingStateWinningNotPossible = function() {
    var player  = new PlayerBlob(1, P(), V(), 9);
    var small   = new Blob(P(15, 0), V(), 1);
    var tooBig1 = new Blob(P(30, 0), V(), 10);
    var tooBig2 = new Blob(P(45, 0), V(), 11);
    
    var oldWorld = new GameState([player, small, tooBig1, tooBig2], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertInstanceOf(LosingGameState, newWorld);
}

GameStateTest.prototype.testShouldNotGoInLosingStateIfWinningIsPossible = function() {
    var player = new PlayerBlob(1, P(), V(), 9);
    var blob1  = new Blob(P(15, 0), V(), 8);
    var blob2  = new Blob(P(30, 0), V(), 10);
    var blob3  = new Blob(P(45, 0), V(), 11);
    
    var oldWorld = new GameState([player, blob1, blob2, blob3], this.bounds, new SpyCollision());
    var newWorld = oldWorld.advance(this.inputHandler, new GameTime(1, 1));
    
    assertNotInstanceOf(LosingGameState, newWorld);
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
    this.called       = false;
}
SpyCollision.prototype.perform = function(blobs) {
    this.called = true;
    return blobs;
}

