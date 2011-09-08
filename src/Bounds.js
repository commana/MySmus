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

