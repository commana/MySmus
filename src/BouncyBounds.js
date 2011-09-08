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

var BouncyBounds = function(x, y, w, h) {
    Bounds.call(this, x, y, w, h);
}

BouncyBounds.prototype = new Bounds();
BouncyBounds.prototype.constructor = BouncyBounds;

BouncyBounds.prototype.handleOutside = function(blob) {
    if (!this.isWithinVertical(blob) && !this.isWithinHorizontal(blob)) {
        return blob.updateVelocity(blob.velocity.invert());
    } else if (this.isOutsideLeft(blob)) {
        return blob.update(
            new Position(blob.radius, blob.position.y),
            new Velocity(blob.velocity.x * -1, blob.velocity.y),
            blob.radius
        );
    } else if (this.isOutsideRight(blob)) {
        return blob.update(
            new Position(this.w - blob.radius, blob.position.y),
            new Velocity(blob.velocity.x * -1, blob.velocity.y),
            blob.radius
        );
    } else if (this.isOutsideTop(blob)) {
        return blob.update(
            new Position(blob.position.x, blob.radius),
            new Velocity(blob.velocity.x, blob.velocity.y * -1),
            blob.radius
        );
    } else if (this.isOutsideBottom(blob)) {
        return blob.update(
            new Position(blob.position.x, this.h - blob.radius),
            new Velocity(blob.velocity.x, blob.velocity.y * -1),
            blob.radius
        );
    }
    throw new Exception("Unknown BouncyBounds condition!");
}
