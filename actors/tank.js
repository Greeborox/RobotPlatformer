Robot.createTank = function(game, x, y, minX, maxX, pickups, shots){
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

  tank.HP = 100;

  tank.animations.play('tankAnim');

  tank.createBomb = function(x,y){
    var bomb = game.add.sprite(x, y, 'plasmaShot');

    bomb.emitter = game.add.emitter(0, 0, 100);
    bomb.emitter.makeParticles('pParticle');

    game.physics.arcade.enable(bomb);
    if(this.body.velocity.x < 0){
      bomb.body.velocity.x = -350;
    } else {
      bomb.body.velocity.x = 350;
    }

    bomb.remove = function(){
      this.emitter.x = this.x;
      this.emitter.y = this.y;
      this.emitter.start(true, 200, null, 3);
      this.kill();
    }

    shots.push(bomb)
  }

  tank.update = function(){
    if(game.currTime - this.lastShot > this.coolDown){
      this.lastShot = game.currTime;
      this.createBomb(this.x,this.y);
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
        pickups.push(Robot.createAmmo(game, this.x, this. y));
        this.x = -100;
        this.y = -100
      }
      this.kill();
    }
  }

  return tank;
}
