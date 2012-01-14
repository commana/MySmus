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

var GameStateTest = TestCase("GameStateTest");

GameStateTest.prototype.setUp = function() {
    this.inputHandler = {process: function(a) {return a; }};
    this.bounds = new AlwaysInsideBounds();
}

GameStateTest.prototype.testShouldGoInLosingStateIfNoPlayerBlobPresent = function() {
    var nextState = new GameState().transition([new Blob, new Blob]);
    
    assertInstanceOf(LosingGameState, nextState);
}

GameStateTest.prototype.testShouldGoInLosingStateIfNonPlayerBlobIsTooBig = function() {
    var player = new PlayerBlob(1, null, null, 1);
    var big    = new Blob(null, null, 2);
    var tooBig = new Blob(null, null, 4);
    
    var nextState = new GameState().transition([player, big, tooBig]);
    
    assertInstanceOf(LosingGameState, nextState);
}

GameStateTest.prototype.testShouldGoInWinningStateIfPlayerIsTooBig = function() {
    var player  = new PlayerBlob(1, null, null, 4);
    var small   = new Blob(null, null, 2);
    var smaller = new Blob(null, null, 1);
    
    var nextState = new GameState().transition([player, small, smaller]);
    
    assertInstanceOf(WinningGameState, nextState);
}

GameStateTest.prototype.testShouldDefaultToLosingStateIfNoBlobs = function() {
    var nextState = new GameState().transition([])
    
    assertInstanceOf(LosingGameState, nextState);
}

GameStateTest.prototype.testShouldGoInLosingStateWinningNotPossible = function() {
    var player  = new PlayerBlob(1, null, null, 9);
    var small   = new Blob(null, null, 1);
    var tooBig1 = new Blob(null, null, 10);
    var tooBig2 = new Blob(null, null, 11);
    
    var nextState = new GameState().transition([player, small, tooBig1, tooBig2]);
    
    assertInstanceOf(LosingGameState, nextState);
}

GameStateTest.prototype.testShouldNotGoInLosingStateIfWinningIsPossible = function() {
    var player = new PlayerBlob(1, null, null, 9);
    var blob1  = new Blob(null, null, 8);
    var blob2  = new Blob(null, null, 10);
    var blob3  = new Blob(null, null, 11);
    
    var nextState = new GameState().transition([player, blob1, blob2, blob3]);
    
    assertNotInstanceOf(LosingGameState, nextState);
}

GameStateTest.prototype.testShouldKeepRunningStateOnDefault = function() {
    var player = new PlayerBlob(1);
    
    var nextState = new GameState().transition([player, new Blob, new Blob]);
    
    assertNotInstanceOf(LosingGameState, nextState);
    assertNotInstanceOf(WinningGameState, nextState);
}

