function Scene() {
  this.key = 'level';

  this.attackers = [];
  this.health = 100;
  this.lost = false;

  this.missiles = [];

  var timestamp = 0;
  var timeBetweenAttackers = 2;
  var timeSinceLastAttacker = 0;

  var difficultyRampUp = 0.95;
  var minimumTimeBetweenAttackers = 0.1;

  this.addAttackerToStage = function(attacker) {
    var attackerElement = document.createElement('div');
    attackerElement.setAttribute("class", "attacker");
    attacker.outlet = attackerElement;
    this.stageElement().appendChild(attackerElement);
  };

  this.addMissileToStage = function(missile) {
    var missileElement = document.createElement('div');
    missileElement.setAttribute("class", "missile");
    missile.outlet = missileElement;
    this.stageElement().appendChild(missileElement);
  };

  this.centerX = function() {
    return this.width() / 2;
  };

  this.centerY = function() {
    return this.height() / 2;
  };

  this.damageDefenders = function(attacker) {
    this.health -= Math.random() * 5 + 5
    this.removeAttacker(attacker);

    if (this.health <= 0) {
      this.gameOver()
    };
  };

  this.defend = function() {
    this.fireMissile();
  };

  this.defenders = function() {
    return document.getElementById("defenders");
  };

  this.distance = function(a, b) {
    if (!a || !b) {
      return undefined
    }

    var deltaX = a.x - b.x;
    var deltaY = a.y - b.y;

    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  }

  this.drawHealthbar = function() {
    this.healthbarElement().find(".healthbar-health").css("width", this.health + '%')
  };

  this.endGame = function() {
    this.lost = true;
    this.removeAttackersFromStage();
    this.removeAttackers();
    this.timestamp = 0;
    this.timeSinceLastAttacker = 0;
  };

  this.gameOver = function() {
    location.reload()
  };

  this.healthbarElement = function() {
    if (!this._healthbarElement) {
      this._healthbarElement = $('#healthbar');
    };
    return this._healthbarElement;
  };

  this.height = function() {
    return $(this.stageElement()).height()
  };

  this.render = function(context, deltaTime) {
    for (var i = 0; i < this.attackers.length; i++) {
      var attacker = this.attackers[i];
      attacker.draw();
    }

    for (var i = 0; i < this.missiles.length; i++) {
      var missile = this.missiles[i];
      missile.draw();
    }

    this.drawHealthbar()
  };

  this.removeAttacker = function(attacker) {
    var index = this.attackers.indexOf(attacker);
    if (index > -1) {
      this.attackers.splice(index, 1);
    };
    this.removeAttackerFromStage(attacker);
  }

  this.removeAttackers = function() {
    for (var i = 0; i < this.attackers.length; i++) {
      var attacker = this.attackers[i];
      this.removeAttacker(attacker);
    };
  }

  this.removeAttackerFromStage = function(attacker) {
    if (attacker.outlet) {
      $(attacker.outlet).remove();
    }
  }

  this.removeAttackersFromStage = function() {
    var attackersToRemove = this.stageElement().getElementsByClassName("attacker");
    for (var i = 0; i < attackersToRemove.length; i++) {
      this.stageElement().removeChild(attackersToRemove[i]);
    };
  }

  this.removeMissile = function(missile) {
    var index = this.missiles.indexOf(missile);
    if (index > -1) {
      this.missiles.splice(index, 1);
    };
    $(missile.outlet).remove();
  }

  this.spawnAttacker = function() {
    var attacker = new Attacker();
    var angle = Math.random() * Math.PI * 2;
    attacker.x = this.width() / 2 + Math.cos(angle) * this.width()/2;
    attacker.y = this.height() / 2 + Math.sin(angle) * this.height()/2;

    this.attackers.push(attacker);
    this.addAttackerToStage(attacker);
  };

  this.fireMissile = function() {
    var heads = [
      {x: this.centerX() - 70, y: this.centerY() - 135}, // Corydon
      {x: this.centerX() + 65, y: this.centerY() - 130} // Wammen
    ];

    var head = heads[Math.floor(Math.random() * heads.length)];

    var missile = Missile.spawn(head.x, head.y);
    this.missiles.push(missile);
    this.addMissileToStage(missile);
  };

  this.stageElement = function() {
    if (!this._stageElement) {
      this._stageElement = document.getElementById('stage');
    };
    return this._stageElement;
  };

  this.update = function(step) {
    timestamp += step;
    timeSinceLastAttacker += step;

    if (timeSinceLastAttacker > timeBetweenAttackers) {
      this.spawnAttacker();
      timeSinceLastAttacker = 0;
      timeBetweenAttackers = timeBetweenAttackers * difficultyRampUp;
      if (timeBetweenAttackers <= minimumTimeBetweenAttackers) {
        timeBetweenAttackers = minimumTimeBetweenAttackers;
      }
    };

    this.updateMissiles(step);
    this.updateAttackers(step);
  };

  this.updateAttackers = function(step) {
    for (var i = 0; i < this.attackers.length; i++) {
      var attacker = this.attackers[i];
      attacker.moveTowards(
        this.width() / 2,
        this.height() / 2
      );

      if (attacker.hitsDefenders()) {
        this.damageDefenders(attacker);
      };
    }
  };

  this.updateMissiles = function(step) {
    for (var i = 0; i < this.missiles.length; i++) {
      var missile = this.missiles[i];
      missile.update();

      var distanceToTarget = this.distance(missile, missile.target);
      if (distanceToTarget < 15) {
        missile.target.alive = false;
        this.removeAttacker(missile.target)
        this.removeMissile(missile)
      }
    }
  };

  this.width = function() {
    return $(this.stageElement()).width()
  };
}

