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

var Position = function(x, y) {
    Vector.call(this, x, y);
}

Position.prototype = new Vector();

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
