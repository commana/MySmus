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

var RunningGameStateTest = TestCase("RunningGameStateTest");

RunningGameStateTest.prototype.setUp = function() {
    
}

RunningGameStateTest.prototype.testShouldGoInLosingStateIfNoPlayerBlobPresent = function() {
    var nextState = new RunningGameState(new StubGame([new Blob, new Blob])).handle();
    
    assertInstanceOf(LosingGameState, nextState);
}

RunningGameStateTest.prototype.testShouldGoInLosingStateIfNonPlayerBlobIsTooBig = function() {
    var player = new PlayerBlob(1, null, null, 1);
    var big    = new Blob(null, null, 2);
    var tooBig = new Blob(null, null, 4);
    
    var nextState = new RunningGameState(new StubGame([player, big, tooBig])).handle();
    
    assertInstanceOf(LosingGameState, nextState);
}

RunningGameStateTest.prototype.testShouldGoInWinningStateIfPlayerIsTooBig = function() {
    var player  = new PlayerBlob(1, null, null, 4);
    var small   = new Blob(null, null, 2);
    var smaller = new Blob(null, null, 1);
    
    var nextState = new RunningGameState(new StubGame([player, small, smaller])).handle();
    
    assertInstanceOf(WinningGameState, nextState);
}

RunningGameStateTest.prototype.testShouldDefaultToLosingStateIfNoBlobs = function() {
    var nextState = new RunningGameState(new StubGame([])).handle()
    
    assertInstanceOf(LosingGameState, nextState);
}

RunningGameStateTest.prototype.testShouldGoInLosingStateWinningNotPossible = function() {
    var player  = new PlayerBlob(1, null, null, 9);
    var small   = new Blob(null, null, 1);
    var tooBig1 = new Blob(null, null, 10);
    var tooBig2 = new Blob(null, null, 11);
    
    var nextState = new RunningGameState(new StubGame([player, small, tooBig1, tooBig2])).handle();
    
    assertInstanceOf(LosingGameState, nextState);
}

RunningGameStateTest.prototype.testShouldNotGoInLosingStateIfWinningIsPossible = function() {
    var player = new PlayerBlob(1, null, null, 9);
    var blob1  = new Blob(null, null, 8);
    var blob2  = new Blob(null, null, 10);
    var blob3  = new Blob(null, null, 11);
    
    var nextState = new RunningGameState(new StubGame([player, blob1, blob2, blob3])).handle();
    
    assertNotInstanceOf(LosingGameState, nextState);
}

RunningGameStateTest.prototype.testShouldKeepRunningStateOnDefault = function() {
    var player = new PlayerBlob(1);
    
    var nextState = new RunningGameState(new StubGame([player, new Blob, new Blob])).handle();
    
    assertNotInstanceOf(LosingGameState, nextState);
    assertNotInstanceOf(WinningGameState, nextState);
}

var StubGame = function(blobs) {
    this.blobs = blobs;
    this.advance = function (input, gametime) { return this; };
}

