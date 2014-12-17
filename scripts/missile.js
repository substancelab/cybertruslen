function Missile() {
  var self = this;

  this.x = undefined;
  this.y = undefined;
  this.accelleration = 0.2;
  this.speed = 0;
  this.maxSpeed = 15;
  this.target = undefined;
  this.outlet = undefined;
  this.angle = - Math.PI/2;
  this.turnSpeed = 0.15

  this.aquireTarget = function() {
    this.target = scene.attackers[Math.floor(Math.random() * scene.attackers.length)];
  };

  this.despawn = function() {
    scene.removeMissile(this);
  };

  this.draw = function() {
    var outlet = this.outlet;
    outlet.style.left = '' + this.x + 'px';
    outlet.style.top = '' + this.y + 'px';
  };

  this.update = function() {
    if (this.target && this.target.alive) {
      var deltaX = this.target.x - this.x;
      var deltaY = this.target.y - this.y;
      var targetAngle = Math.atan2(deltaY, deltaX);
      if (targetAngle < -Math.PI * 1.5) {
        targetAngle += Math.PI * 2
      };
      if (targetAngle > Math.PI / 2) {
        targetAngle -= Math.PI * 2
      };
      if (targetAngle > this.angle) {
        this.angle += this.turnSpeed;
      } else if (targetAngle < this.angle) {
        this.angle -=this.turnSpeed;
      };
    } else {
      this.aquireTarget()
      // No target
    }

    // Out of bounds?
    if (
        (this.x < 0 || this.x > scene.width()) ||
        (this.y < 0 || this.y > scene.height())
      ) {
      this.despawn()
    }

    if (this.speed < this.maxSpeed) {
      this.speed += this.accelleration;
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  };

  this.moveTowards = function(x, y) {
    var deltaX = x - this.x;
    var deltaY = y - this.y;

    var angle = Math.atan2(deltaY, deltaX);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }
}
Missile.spawn = function(x, y) {
  var missile = new Missile();

  missile.x = x;
  missile.y = y;

  missile.aquireTarget();

  return missile;
};
