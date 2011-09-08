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
