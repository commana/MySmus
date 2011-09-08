var LosingGameState = function(blobs, bounds, collision) {
    GameState.call(this, blobs, bounds, collision);
}

LosingGameState.prototype = new GameState();

LosingGameState.prototype.advance = function(input, gametime) {
    return this;
}

LosingGameState.prototype.status = function() {
    return "Lost!";
}
