var GameState = function(blobs, bounds, collision) {
    this.blobs     = blobs;
    this.bounds    = bounds;
    this.collision = collision;
};

GameState.prototype.advance = function(input, gametime) {
    var blobs = input.process(this.blobs);
    
    var movedBlobs = [];
    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        movedBlobs.push(blob.moveInside(this.bounds, gametime));
    }
    
    var blobsAfterCollisions = this.collision.perform(movedBlobs).filter(function(b) {
        return b.mass() > 0;
    });
    
    return this.transitionState(blobsAfterCollisions);
}

GameState.prototype.transitionState = function(blobs) {
    if (blobs.length === 0) {
        return this.lose([]);
    }
    var playerBlobs = blobs.filter(function(b) {
        return b.player > 0;
    });
    if (playerBlobs.length === 0) {
        return this.lose(blobs);
    }
    // For now, we assume only one player...
    var playerBlob = playerBlobs.shift();
    if (!this.isWinningPossible(playerBlob, blobs)) {
        return this.lose(blobs);
    }
    
    var biggestBlob = blobs.reduce(function(a, b) {
        return a.mass() > b.mass() ? a : b;
    });
    var totalMass = blobs.mass();
    
    if (biggestBlob.mass() > totalMass/2) {
        if (biggestBlob instanceof Object(PlayerBlob)) {
            return this.win(blobs);
        } else {
            return this.lose(blobs);
        }
    }
    
    return new GameState(blobs, this.bounds, this.collision);
}

GameState.prototype.isWinningPossible = function(player, blobs) {
    var biggerBlobs = blobs.filter(function(b) {
        return b !== player && player.mass() < b.mass();
    });
    var smallerBlobs = blobs.filter(function(b) {
        return b !== player && player.mass() >= b.mass();
    });
    return smallerBlobs.mass() >= biggerBlobs.mass();
}

GameState.prototype.lose = function(blobs) {
    return new LosingGameState(blobs, this.bounds, this.collision);
}

GameState.prototype.win = function(blobs) {
    return new WinningGameState(blobs, this.bounds, this.collision);
}

GameState.prototype.status = function() {
    return "Running...";
}
