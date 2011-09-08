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

var MassTransformationCollision = function(addonCollider) {
    Collision.call(this);
    this.addonCollider = addonCollider || new BouncyCollision();
}

MassTransformationCollision.prototype = new Collision();

MassTransformationCollision.prototype.handle = function(blob1, blob2) {
    if (blob1.mass() < blob2.mass()) {
        return this.transferMass(blob1, blob2);
    } else if (blob1.mass() > blob2.mass()) {
        // restore ordering as it was via reverse()
        return this.transferMass(blob2, blob1).reverse();
    } else {
        return this.addonCollider.handle(blob1, blob2);
    }
}

MassTransformationCollision.prototype.transferMass = function(smaller, bigger) {
    var newBlob1 = smaller.updateMass(smaller.mass() - 1);
    var newBlob2 = bigger.updateMass(bigger.mass() + 1);
    return [newBlob1, newBlob2];
}
