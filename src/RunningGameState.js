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

var RunningGameState = function(game) {
    GameState.call(this, game);
}

RunningGameState.prototype = new GameState();

RunningGameState.prototype.handle = function(input, gametime) {
    var blobs = this.game.blobs;
    
    if (blobs.length === 0) {
        return new LosingGameState();
    }
    var playerBlobs = blobs.filter(function(b) {
        return b.player > 0;
    });
    if (playerBlobs.length === 0) {
        return new LosingGameState(this.game);
    }
    // For now, we assume only one player...
    var playerBlob = playerBlobs.shift();
    if (!this.isWinningPossible(playerBlob, blobs)) {
        return new LosingGameState(this.game);
    }
    
    var biggestBlob = blobs.reduce(function(a, b) {
        return a.mass() > b.mass() ? a : b;
    });
    var totalMass = blobs.mass();
    
    if (biggestBlob.mass() > totalMass/2) {
        if (biggestBlob instanceof Object(PlayerBlob)) {
            return new WinningGameState(this.game);
        } else {
            return new LosingGameState(this.game);
        }
    }
    
    return new RunningGameState(this.game.advance(input, gametime));
}

RunningGameState.prototype.isWinningPossible = function(player, blobs) {
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

RunningGameState.prototype.status = function() {
    return "Running...";
}

