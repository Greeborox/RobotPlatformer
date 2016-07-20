Robot.createPlasma = function(game){
  var plasma = game.add.group();
  plasma.enableBody = true;
  plasma.physicsBodyType = Phaser.Physics.ARCADE;
  plasma.createMultiple(20,'rocket');
  plasma.setAll('outOfBoundsKill', true);
  plasma.setAll('checkWorldBounds', true);

  plasma.createExplosion = function(x,y){
    var explo = game.add.sprite(x, y, 'explosion');
    game.physics.arcade.enable(explo);
    explo.anchor.setTo(.5);
    game.time.events.add(100, function(){explo.kill()}, this);
    return explo
  }

  plasma.shotSFX = game.add.audio('plasma');
  plasma.coolDown = 600;

  plasma.shoot = function(roboX, roboY, roboW, roboH, facingLeft){
    var shot = this.getFirstExists(false);
    if(shot) {
      this.shotSFX.play()
      shot.reset(roboX+roboW/2,roboY+roboH/2);
      shot.anchor.setTo(.5, 1)
      if(facingLeft){
        shot.scale.x = -1;
        shot.body.velocity.x = -600;
      } else {
        shot.scale.x = 1;
        shot.body.velocity.x = 600;
      }
      shot.body.velocity.y = 0;
    }
  };
  plasma.update = function(layer, doors, explos){
    game.physics.arcade.collide(this, layer, function(shot){
      explos.push(plasma.createExplosion(shot.x,shot.y));
      shot.kill();
    }, null, this);
    for(door in doors){
      game.physics.arcade.collide(this, doors[door], function(door, shot){
        explos.push(plasma.createExplosion(shot.x,shot.y));
        shot.kill();
      }, null, this);
    }
  };

  return plasma;
}
