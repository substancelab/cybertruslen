function Stage() {
  var self = this;

  self.initialize = function() {
    self.loop = new GameLoop();
  };

  self.play = function(scene) {
    scene.stage = self;
    self.loop.run(scene);
  };

  self.initialize();
}

