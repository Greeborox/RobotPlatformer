Robot.createKopter = function(game, x, y, pickups, shots, explos){
  var kopter = game.add.sprite(x, y, 'pseudoKopter');
  kopter.animations.add('kopterAnim', [0,1,2,3,4,5,6,7,8,9,10], 10, true);
  game.physics.arcade.enable(kopter);
  kopter.body.setSize(65, 32, 5, -5);
  kopter.body.velocity.x = 200 * game.rnd.pick([-1, 1]);
  kopter.body.bounce.x = 1;
  kopter.anchor.setTo(.5, 0)
  kopter.lastShot = 0;
  kopter.coolDown = 1500;
  kopter.pointValue = 10;

  kopter.HP = 10;

  kopter.emitter = game.add.emitter(0, 0, 100);
  kopter.emitter.makeParticles(['kopterPart1','kopterPart2','kopterPart3','kopterPart4']);
  kopter.emitter.gravity = 200;

  kopter.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 600, null, 5);
  };

  kopter.createBomb = function(x,y){
    var bomb = game.add.sprite(x, y, 'bomb');
    bomb.events.onOutOfBounds.add(function(){
      this.destroy();
    }, this);

    bomb.emitter = game.add.emitter(0, 0, 100);
    bomb.emitter.makeParticles('pParticle');
    bomb.emitter.gravity = 500;

    game.physics.arcade.enable(bomb);
    bomb.body.gravity.y = 600;

    bomb.remove = function(){
      this.emitter.x = this.x;
      this.emitter.y = this.y;
      this.emitter.start(true, 200, null, 3);
      if(this.alive){
        explos.push(Robot.createExplosion(this.x+this.height*0.5,this.y+this.width*0.5));
      }
      this.kill();
    }

    shots.push(bomb)
  }

  kopter.animations.play('kopterAnim');

  kopter.update = function(){
    if(game.currTime - this.lastShot > this.coolDown){
      this.lastShot = game.currTime;
      this.createBomb(this.x,this.y);
    }
    if(this.body.velocity.x < 0){
      this.scale.x = 1;
    } else {
      this.scale.x = -1;
    }
    if(this.HP <= 0){
      if(this.alive){
        this.particleBurst(this.x,this.y);
        pickups.push(Robot.createTreasure(game, this.x, this.y));
        this.x = -100;
        this.y = -100;
        Robot.points += this.pointValue;
      }
      this.destroy();
    }
  }

  return kopter;
}
