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

Array.prototype.cartesianProduct = function(other) {
    var result = [];
    var index  = 0;
    
    for (var i = 0; i < this.length; i++) {
        var a = this[i];
        for (var j = 0; j < other.length; j++) {
            var b = other[j];
            result[index++] = [a, b];
        }
    }
    return result;
}

Array.prototype.pairs = function() {
    var pairs = [];
    var index = 0;
    
    for (var i = 0; i  < this.length; i++) {
        var a = this[i];
        for (var j = i+1; j < this.length; j++) {
            var b = this[j];
            pairs[index++] = [a, b];
        }
    }
    return pairs;
}

Array.prototype.mass = function() {
    return this.reduce(function(acc, blob) {
        return acc + blob.mass();
    }, 0);
}
