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
