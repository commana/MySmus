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

function GameState() {};

GameState.prototype.transition = function(blobs) {
    if (blobs.length === 0) {
        return this.lose();
    }
    var playerBlobs = blobs.filter(function(b) {
        return b.player > 0;
    });
    if (playerBlobs.length === 0) {
        return this.lose();
    }
    // For now, we assume only one player...
    var playerBlob = playerBlobs.shift();
    if (!this.isWinningPossible(playerBlob, blobs)) {
        return this.lose();
    }
    
    var biggestBlob = blobs.reduce(function(a, b) {
        return a.mass() > b.mass() ? a : b;
    });
    var totalMass = blobs.mass();
    
    if (biggestBlob.mass() > totalMass/2) {
        if (biggestBlob instanceof Object(PlayerBlob)) {
            return this.win();
        } else {
            return this.lose();
        }
    }
    
    return this;
}

GameState.prototype.isWinningPossible = function(player, blobs) {
    var biggerBlobs = blobs.filter(function(b) {
        return b !== player && player.mass() < b.mass();
    });
    var smallerBlobs = blobs.filter(function(b) {
        return b !== player && player.mass() >= b.mass();
    });
    var smallerMass = smallerBlobs.mass();
    return biggerBlobs.length === 0 || biggerBlobs.some(function(b) {
        return smallerMass + player.mass() > b.mass();
    });
}

GameState.prototype.lose = function() {
    return new LosingGameState();
}

GameState.prototype.win = function() {
    return new WinningGameState();
}

GameState.prototype.status = function() {
    return "Running...";
}

GameState.prototype.isRunning = function() {
    return true;
}
