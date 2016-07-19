Robot.createRobot = function(game,x,y,plasma,gun){
  var robot = game.add.sprite(x, y, 'robot');
  game.physics.arcade.enable(robot);
  robot.attacks = {
    'plasma': plasma,
    'gun': gun
  }
  robot.currAttack = 'gun';
  robot.body.setSize(55, 100, 25, 20);
  robot.body.gravity.y = 800;
  robot.facingLeft = false;
  robot.lastShot = 0;
  robot.rockets = 5;

  robot.emitter = game.add.emitter(0, 0, 100);
  robot.emitter.makeParticles(['headPart','bodyPart','legPart2','legPart1']);
  robot.emitter.gravity = 300;

  robot.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 600, null, 5);
  };

  robot.animations.add('walkRight', [0,1,2,3,4,5], 8, true);
  robot.animations.add('walkLeft', [6,7,8,9,10,11], 8, true);
  robot.moveRobot = function(cursor,space,zet){
    if (cursor.left.isDown) {
      this.body.velocity.x = -200;
      if(this.body.onFloor() || this.body.touching.down){
        this.animations.play('walkLeft');
      } else {
        this.frame = 6;
      }
      this.facingLeft = true;
    }
    else if (cursor.right.isDown) {
      this.body.velocity.x = 200;
      if(this.body.onFloor() || this.body.touching.down){
        this.animations.play('walkRight');
      } else {
        this.frame = 0;
      }
      this.facingLeft = false;
    } else {
      this.body.velocity.x = 0;
      this.animations.stop();
      if(this.facingLeft){
        this.frame = 6;
      } else {
        this.frame = 0;
      }
    }
    if ((cursor.up.isDown && this.body.onFloor()) || (cursor.up.isDown && this.body.touching.down)) {
      this.body.velocity.y = -550;
    }
    if (space.isDown && this.alive){
      if(game.currTime - this.lastShot > this.attacks[this.currAttack].coolDown){
        this.lastShot = game.currTime;
        this.attacks[this.currAttack].shoot(this.x,this.y,this.width,this.height, this.facingLeft);
      }
    }
    if (zet.isDown && this.alive){
      if(game.currTime - this.lastShot > this.attacks["plasma"].coolDown && this.rockets){
        this.rockets -= 1;
        this.lastShot = game.currTime;
        this.attacks["plasma"].shoot(this.x,this.y,this.width,this.height, this.facingLeft);
      }
    }
  };
  return robot;
}
