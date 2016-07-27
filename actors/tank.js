Robot.createTank = function(game, x, y, minX, maxX, pickups, shots, explos){
  var tank = game.add.sprite(x, y, 'tank');
  tank.animations.add('tankAnim', [0,1,2], 10, true);
  game.physics.arcade.enable(tank);
  //tank.body.setSize(42, 42, 28, 26);
  tank.anchor.setTo(.5, 0)
  tank.body.velocity.x = 75 * game.rnd.pick([-1, 1]);
  tank.body.bounce.x = 1;
  tank.body.gravity.y = 600;
  tank.lastShot = 0;
  tank.coolDown = 2500;
  tank.pointValue = 25;

  tank.HP = 100;

  tank.emitter = game.add.emitter(0, 0, 100);
  tank.emitter.makeParticles(['tankPart1','tankPart2']);
  tank.emitter.gravity = 200;

  tank.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 600, null, 5);
  };

  tank.animations.play('tankAnim');

  tank.createBomb = function(x,y){
    var bomb = game.add.sprite(x, y, 'rocket');
    bomb.events.onOutOfBounds.add(function(){
      this.destroy();
    }, this);

    bomb.anchor.setTo(.5, 1)

    bomb.emitter = game.add.emitter(0, 0, 100);
    bomb.emitter.makeParticles('pParticle');

    game.physics.arcade.enable(bomb);
    if(this.body.velocity.x < 0){
      bomb.scale.x = -1;
      bomb.body.velocity.x = -350;
    } else {
      bomb.scale.x = 1;
      bomb.body.velocity.x = 350;
    }

    bomb.remove = function(){
      this.emitter.x = this.x;
      this.emitter.y = this.y;
      this.emitter.start(true, 200, null, 3);
      if(this.alive){
        explos.push(Robot.createExplosion(this.x+this.height*0.5,this.y+this.width*0.5));
      }
      this.destroy();
    }

    shots.push(bomb)
  }

  tank.update = function(){
    if(game.currTime - this.lastShot > this.coolDown){
      this.lastShot = game.currTime;
      this.createBomb(this.x,this.y+10);
    }
    if((this.x-30<minX && this.body.velocity.x < 0)|| (this.x>maxX && this.body.velocity.x > 0)){
      tank.body.velocity.x *= -1;
    }
    if(this.body.velocity.x < 0){
      this.scale.x = -1;
    } else {
      this.scale.x = 1;
    }
    if(this.HP <= 0){
      if(this.alive){
        this.particleBurst(this.x,this.y);
        explos.push(Robot.createExplosion(this.x+this.height*0.5,this.y));
        pickups.push(Robot.createTreasure(game, this.x, this.y));
        this.x = -100;
        this.y = -100;
        Robot.points += this.pointValue;
      }
      this.destroy();
    }
  }

  return tank;
}
