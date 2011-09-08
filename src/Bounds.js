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

function Bounds(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Bounds.prototype.isInside = function(blob) {
    return this.isWithinHorizontal(blob) && this.isWithinVertical(blob);
}

Bounds.prototype.isWithinHorizontal = function(blob) {
    return (!this.isOutsideLeft(blob)) && (!this.isOutsideRight(blob));
}

Bounds.prototype.isOutsideLeft = function(blob) {
    return blob.left() < this.x;
}

Bounds.prototype.isOutsideRight = function(blob) {
    return blob.right() > this.w;
}

Bounds.prototype.isWithinVertical = function(blob) {
    return (!this.isOutsideTop(blob)) && (!this.isOutsideBottom(blob));
}

Bounds.prototype.isOutsideTop = function(blob) {
    return blob.top() < this.y;
}

Bounds.prototype.isOutsideBottom = function(blob) {
    return blob.bottom() > this.h;
}

Bounds.prototype.handleOutside = function(blob) {
    
}

