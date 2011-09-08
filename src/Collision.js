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

function Collision() {}

Collision.prototype.perform = function(blobs) {
    var handledIndices = [];
    for (var i = 0; i < blobs.length; i++) {
        var a = blobs[i];
        for (var j = 0; j < blobs.length; j++) {
            var b = blobs[j];
            
            if (a === b) continue;
            // Don't handle already collided pairs:
            // Skip (j,i) if (i,j) has been checked already.
            if (handledIndices.indexOf(j) !== -1) continue;
            handledIndices.push(i);
            
            if (a.collidesWith(b)) {
                var collisionPair = this.handle(a, b);
                blobs[i] = collisionPair[0];
                blobs[j] = collisionPair[1];
            }
        }
    }
    return blobs;
}

Collision.prototype.handle = function(blob1, blob2) {
    return [blob1, blob2];
}

