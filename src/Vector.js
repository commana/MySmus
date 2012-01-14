/*
 * Copyright 2011, 2012 Christoph Thelen
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

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

Vector.prototype.sub = function(other) {
    return new Vector(this.x - other.x, this.y - other.y);
}

Vector.prototype.invert = function(other) {
    return this.mul(-1);
}

Vector.prototype.mul = function(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.div = function(scalar) {
    return this.mul(1/scalar);
}

Vector.prototype.len = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.dot = function(Vector) {
    return this.x * Vector.x + this.y * Vector.y;
}
