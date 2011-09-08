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

var InputHandler = function(input) {
    this.input = input;
}

InputHandler.prototype.process = function(blobs) {
    for (var i = 0; i < this.input.length; i++) {
        var click = this.input[i];
        for (var j = 0; j < blobs.length; j++) {
            var blob = blobs[j];
            if (click.player !== blob.player) continue;
            if (!this.isClickNearBlob(click, blob)) continue;
            
            var dx = click.position.x - blob.position.x;
            var dy = click.position.y - blob.position.y;
            var angle = Math.atan2(dy, dx);
            
            var x = Math.cos(angle);
            var y = Math.sin(angle);
            var radius = 0.5;
            var space  = 5;
            var speed  = 50;
            
            var position = new Position(
                blob.position.x + (blob.radius + radius + space) * x,
                blob.position.y + (blob.radius + radius + space) * y
            );
            var velocity = new Velocity(
                x * speed,
                y * speed
            );
            
            blobs[j] = blob.update(
                blob.position,
                blob.velocity.add(velocity.mul(-1*radius).div(blob.mass()/8)),
                blob.radius - radius
            );
            blobs.push(new Blob(position, velocity, radius));
        }
    }
    return blobs;
}

InputHandler.prototype.isClickNearBlob = function(click, blob) {
    var maxDistance = 50 + blob.radius;
    var distance = blob.position.distanceTo(click.position);
    
    return distance < maxDistance && distance > blob.radius;
}
