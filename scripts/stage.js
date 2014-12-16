function Stage() {
  var self = this;

  self.height = function() {
    return self.context.canvas.height;
  };

  self.initialize = function() {
    self.context = canvas.getContext('2d');
    self.loop = new GameLoop(self.context);
  };

  self.play = function(scene) {
    scene.stage = self;
    self.loop.run(scene);
  };

  self.width = function() {
    return self.context.canvas.width;
  };

  self.initialize();
}

