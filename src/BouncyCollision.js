var BouncyCollision = function() {
    Collision.call(this);
}

BouncyCollision.prototype = new Collision();

// found @ http://www.emanueleferonato.com/2007/08/19/managing-ball-vs-ball-collision-with-flash/
BouncyCollision.prototype.handle = function(blob1, blob2) {
    var dx = blob1.position.x - blob2.position.x;
    var dy = blob1.position.y - blob2.position.y;
    var angle = Math.atan2(dy, dx);
    
    var magnitude1 = Math.sqrt(
        Math.pow(blob1.velocity.x, 2) + Math.pow(blob1.velocity.y, 2)
    );
    var magnitude2 = Math.sqrt(
        Math.pow(blob2.velocity.x, 2) + Math.pow(blob2.velocity.y, 2)
    );
    var direction1 = Math.atan2(blob1.velocity.y, blob1.velocity.x);
    var direction2 = Math.atan2(blob2.velocity.y, blob2.velocity.x);
    var newVelocity1 = new Velocity(
        magnitude1 * Math.cos(direction1 - angle),
        magnitude1 * Math.sin(direction1 - angle)
    );
    var newVelocity2 = new Velocity(
        magnitude2 * Math.cos(direction2 - angle),
        magnitude2 * Math.sin(direction2 - angle)
    );
    
    var finalVelocity1 = new Velocity(
        ((blob1.mass() - blob2.mass()) * newVelocity1.x + (blob2.mass() + blob2.mass()) * newVelocity2.x) / (blob1.mass() + blob2.mass()),
        newVelocity1.y
    );
    var finalVelocity2 = new Velocity(
        ((blob1.mass() + blob1.mass()) * newVelocity1.x + (blob2.mass() - blob1.mass()) * newVelocity2.x) / (blob1.mass() + blob2.mass()),
        newVelocity2.y
    );
    
    var newBlob1 = blob1.updateVelocity(new Velocity(
        Math.cos(angle) * finalVelocity1.x + Math.cos(angle + Math.PI/2) * finalVelocity1.y,
        Math.sin(angle) * finalVelocity1.x + Math.sin(angle + Math.PI/2) * finalVelocity1.y
    ));
    var newBlob2 = blob2.updateVelocity(new Velocity(
        Math.cos(angle) * finalVelocity2.x + Math.cos(angle + Math.PI/2) * finalVelocity2.y,
        Math.sin(angle) * finalVelocity2.x + Math.sin(angle + Math.PI/2) * finalVelocity2.y
    ));
    
    return [newBlob1, newBlob2];
}
