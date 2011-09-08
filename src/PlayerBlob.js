var PlayerBlob = function(player, position, velocity, radius) {
    Blob.call(this, position, velocity, radius);
    this.player = player;
}

PlayerBlob.prototype = new Blob();

PlayerBlob.prototype.updateVelocity = function(velocity) {
    return new PlayerBlob(this.player, this.position, velocity, this.radius);
}

PlayerBlob.prototype.updateMass = function(mass) {
    return new PlayerBlob(this.player, this.position, this.velocity, mass);
}

PlayerBlob.prototype.update = function(position, velocity, radius) {
    return new PlayerBlob(this.player, position, velocity, radius);
}
