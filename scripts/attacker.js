function Attacker() {
  var self = this;

  this.alive = true;
  this.x = undefined;
  this.y = undefined;
  this.speed = 5;
  this.outlet = undefined;

  this.draw = function() {
    var outlet = this.outlet;
    outlet.style.left = '' + this.x + 'px';
    outlet.style.top = '' + this.y + 'px';
  };

  this.hitsDefenders = function() {
    if (scene.distance(this, {x: scene.centerX(), y: scene.centerY()}) < 40) {
      return true;
    }
  };

  this.moveTowards = function(x, y) {
    var deltaX = x - this.x;
    var deltaY = y - this.y;

    var angle = Math.atan2(deltaY, deltaX);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  };
}
