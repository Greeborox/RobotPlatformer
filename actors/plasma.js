Robot.createPlasma = function(game){
  var plasma = game.add.group();
  plasma.enableBody = true;
  plasma.physicsBodyType = Phaser.Physics.ARCADE;
  plasma.createMultiple(20,'plasmaShot');
  plasma.setAll('outOfBoundsKill', true);
  plasma.setAll('checkWorldBounds', true);

  plasma.shotSFX = game.add.audio('plasma');
  plasma.coolDown = 250;

  plasma.emitter = game.add.emitter(0, 0, 100);
  plasma.emitter.makeParticles('pParticle');
  plasma.emitter.gravity = 500;

  plasma.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 300, null, 7);
  };
  plasma.shoot = function(roboX, roboY, roboW, roboH, facingLeft){
    var shot = this.getFirstExists(false);
    if(shot) {
      this.shotSFX.play()
      shot.reset(roboX+roboW/2,roboY+roboH/2);
      shot.anchor.setTo(0.5);
      if(facingLeft){
        shot.body.velocity.x = -600;
      } else {
        shot.body.velocity.x = 600;
      }
      shot.body.velocity.y = 0;
    }
  };
  plasma.update = function(layer, doors){
    game.physics.arcade.collide(this, layer, function(shot){
      this.particleBurst(shot.x,shot.y)
      shot.kill();
    }, null, this);
    for(door in doors){
      game.physics.arcade.collide(this, doors[door], function(door, shot){
        this.particleBurst(shot.x,shot.y)
        shot.kill();
      }, null, this);
    }
  };

  return plasma;
}
