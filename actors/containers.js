Robot.createContainer = function(game,x,y, type, exploding){
  container = game.add.sprite(x, y, type);

  game.physics.arcade.enable(container);
  container.body.immovable = true;

  container.body.gravity.y = 600;
  container.exploding = exploding;

  container.HP = 30;

  container.emitter = game.add.emitter(0, 0, 100);
  container.emitter.makeParticles(['contPart1','contPart2','contPart3','contPart4','contPart5','contPart6']);
  container.emitter.gravity = 200;

  container.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 600, null, 5);
  };

  container.update = function(){
    if(this.HP <= 15){
      this.frame = 1;
    }
  }

  return container
}
