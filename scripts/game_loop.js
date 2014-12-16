function GameLoop(context) {
  // Fixed timestep GameLoop from
  // http://codeincomplete.com/posts/2013/12/4/javascript_game_foundations_the_game_loop/
  var self = this;
  var context = context;

  self.clear = function() {
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
  };

  self.frame = function() {
    now = self.timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while(dt > step) {
      dt = dt - step;
      self.update(step);
    }
    self.render(dt);
    last = now;
    self.requestAnimationFrame();
  };

  self.render = function(deltaTime) {
    self.clear()
    self.scene.render(context, deltaTime);
  };

  self.requestAnimationFrame = function() {
    requestAnimationFrame(self.frame);
  };

  self.run = function(scene) {
    self.scene = scene;
    scene.context = context;
    self.requestAnimationFrame()
  }

  self.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  };

  self.update = function(step) {
    self.scene.update(step);
  }

  var now,
      dt   = 0,
      last = self.timestamp(),
      step = 1/60;
}


