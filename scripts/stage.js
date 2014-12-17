function Stage() {
  var self = this;

  self.element = function() {
    return $('#stage');
  };

  self.initialize = function() {
    self.loop = new GameLoop();
  };

  self.keyboardEvent = function(event) {
    if (this.scene && this.scene.keyboardEvent) {
      this.scene.keyboardEvent(event);
    }
  }

  self.play = function(scene) {
    if (this.scene) {
      this.element().removeClass('stage-' + this.scene.key);
    }

    this.scene = scene;
    scene.stage = self;

    this.element().addClass('stage-' + this.scene.key);

    self.loop.run(scene);
  };

  self.initialize();
}

