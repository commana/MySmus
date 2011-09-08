var WinningGameState = function(blobs, bounds, collision) {
    GameState.call(this, blobs, bounds, collision);
}

WinningGameState.prototype = new GameState();

WinningGameState.prototype.advance = function(input, gametime) {
    return this;
}

WinningGameState.prototype.status = function() {
    return "Won!";
}
