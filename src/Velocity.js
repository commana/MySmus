var Velocity = function(x, y) {
    this.x = x;
    this.y = y;
}

Velocity.prototype.add = function(other) {
    return new Velocity(this.x + other.x, this.y + other.y);
}

Velocity.prototype.invert = function(other) {
    return this.mul(-1);
}

Velocity.prototype.mul = function(scalar) {
    return new Velocity(this.x * scalar, this.y * scalar);
}

Velocity.prototype.div = function(scalar) {
    return this.mul(1/scalar);
}

Velocity.prototype.len = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Velocity.prototype.dot = function(velocity) {
    return this.x * velocity.x + this.y * velocity.y;
}
