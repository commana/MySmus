var Position = function(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.applyVelocity = function(velocity, gametime) {
    return new Position(
        this.x + velocity.x * gametime.value(),
        this.y + velocity.y * gametime.value()
    );
}

Position.prototype.distanceTo = function(p) {
    return Math.sqrt(
        Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2)
    );
}
