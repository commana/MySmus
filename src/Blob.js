/*
 * Copyright 2011 Christoph Thelen
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

var Blob = function(position, velocity, radius) {
    this.position = position;
    this.velocity = velocity;
    this.radius   = typeof radius === "undefined" ? 20 : radius;
}

Blob.prototype.moveInside = function(bounds, gametime) {
    var nextPosition = this.position.applyVelocity(this.velocity, gametime);
    var nextBlob = this.update(nextPosition, this.velocity, this.radius);
    
    if (! bounds.isInside(nextBlob)) {
        return bounds.handleOutside(nextBlob);
    } else {
        return nextBlob;
    }
}

Blob.prototype.collidesWith = function(blob) {
    var distance = this.position.distanceTo(blob.position);
    
    return distance <= (this.radius + blob.radius);
}

Blob.prototype.updateVelocity = function(velocity) {
    return new Blob(this.position, velocity, this.radius);
}

Blob.prototype.updateMass = function(mass) {
    return new Blob(this.position, this.velocity, mass);
}

Blob.prototype.update = function(position, velocity, radius) {
    return new Blob(position, velocity, radius);
}

Blob.prototype.left = function() {
    return this.position.x - this.radius;
}

Blob.prototype.right = function() {
    return this.position.x + this.radius;
}

Blob.prototype.top = function() {
    return this.position.y - this.radius;
}

Blob.prototype.bottom = function() {
    return this.position.y + this.radius;
}

Blob.prototype.mass = function() {
    return this.radius;
}
