var BouncyBounds = function(x, y, w, h) {
    Bounds.call(this, x, y, w, h);
}

BouncyBounds.prototype = new Bounds();
BouncyBounds.prototype.constructor = BouncyBounds;

BouncyBounds.prototype.handleOutside = function(blob) {
    if (!this.isWithinVertical(blob) && !this.isWithinHorizontal(blob)) {
        return blob.updateVelocity(blob.velocity.invert());
    } else if (this.isOutsideLeft(blob)) {
        return blob.update(
            new Position(blob.radius, blob.position.y),
            new Velocity(blob.velocity.x * -1, blob.velocity.y),
            blob.radius
        );
    } else if (this.isOutsideRight(blob)) {
        return blob.update(
            new Position(this.w - blob.radius, blob.position.y),
            new Velocity(blob.velocity.x * -1, blob.velocity.y),
            blob.radius
        );
    } else if (this.isOutsideTop(blob)) {
        return blob.update(
            new Position(blob.position.x, blob.radius),
            new Velocity(blob.velocity.x, blob.velocity.y * -1),
            blob.radius
        );
    } else if (this.isOutsideBottom(blob)) {
        return blob.update(
            new Position(blob.position.x, this.h - blob.radius),
            new Velocity(blob.velocity.x, blob.velocity.y * -1),
            blob.radius
        );
    }
    throw new Exception("Unknown BouncyBounds condition!");
}
