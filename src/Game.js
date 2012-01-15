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

var Game = function(blobs, bounds, collision) {
    this.blobs     = blobs;
    this.bounds    = bounds;
    this.collision = collision;
};

Game.prototype.advance = function(input, gametime) {
    var blobs = input.process(this.blobs);
    
    var movedBlobs = [];
    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        movedBlobs.push(blob.moveInside(this.bounds, gametime));
    }
    
    var blobsAfterCollisions = this.collision.perform(movedBlobs).filter(function(b) {
        return b.mass() > 0;
    });
    
    return new Game(blobsAfterCollisions, this.bounds, this.collision);
}

