var GameTime = function(fps, scale) {
    this.fps   = fps;
    this.scale = scale;
}

GameTime.prototype.update = function(newTimestamp) {
    this.timestamp = newTimestamp - this.timestamp;
}

GameTime.prototype.value = function() {
    return this.scale / this.fps;
}
