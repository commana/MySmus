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

if (typeof exports === "undefined") var exports = {};

var InputQueue = [];

exports.gameLoop = function(canvas) {
    var fps       = 30;
    var timescale = 1.0;
    var gametime  = new GameTime(fps, timescale);
    
    var blobs = [
        new PlayerBlob(1, new Position(100, 100), new Velocity(0, 5), 35),
        new Blob(new Position(300, 230), new Velocity(5, 0), 40),
        new Blob(new Position(300, 100), new Velocity(0, 5), 10),
        new Blob(new Position(540, 200), new Velocity(5, 0), 40)
    ];
    var bounds = new BouncyBounds(0, 0, 640, 480);
    var world  = new GameState(blobs, bounds, new MassTransformationCollision());
    
    return setInterval(function() {
        var input = new InputHandler(InputQueue.slice());
        InputQueue = [];
        world = world.advance(input, gametime);
        draw(world, canvas);
    }, 1000/fps);
}

exports.input = function(x, y) {
    InputQueue.push({position: new Position(x, y), player: 1});
}

function draw(world, canvas) {
    // clear canvas
    canvas.width = canvas.width;
    
    var ctx = canvas.getContext("2d");
    
    // Write status message...
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.fillText(world.status(), 0, 0);
    
    for (var i = 0; i < world.blobs.length; i++) {
        var blob = world.blobs[i];
        
        ctx.beginPath();
        ctx.arc(blob.position.x, blob.position.y, blob.radius, 0, Math.PI*2, false);
        
        ctx.fillStyle = blob.player? "#777" : "#000";
        ctx.fill();
        ctx.closePath();
    }
}

