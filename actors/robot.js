Robot.createRobot = function(game,x,y,plasma){
  var robot = game.add.sprite(x, y, 'robot');
  game.physics.arcade.enable(robot);
  robot.attacks = {
    'plasma': plasma,
  }
  robot.currAttack = 'plasma';
  robot.body.setSize(55, 100, 25, 20);
  robot.body.gravity.y = 800;
  robot.facingLeft = false;
  robot.lastShot = 0;
  robot.animations.add('walkRight', [0,1,2,3,4,5], 10, true);
  robot.animations.add('walkLeft', [6,7,8,9,10,11], 10, true);
  robot.animations.add('shootRight', [12,13], 8, true);
  robot.animations.add('shootLeft', [14,15], 8, true);
  robot.moveRobot = function(cursor,space){
    if (cursor.left.isDown) {
      this.body.velocity.x = -200;
      if(this.body.onFloor()){
        this.animations.play('walkLeft');
      } else {
        this.frame = 6;
      }
      this.facingLeft = true;
    }
    else if (cursor.right.isDown) {
      this.body.velocity.x = 200;
      if(this.body.onFloor()){
        this.animations.play('walkRight');
      } else {
        this.frame = 0;
      }
      this.facingLeft = false;
    } else {
      this.body.velocity.x = 0;
      this.animations.stop();
      if(this.facingLeft && !space.isDown){
        this.frame = 6;
      } else if (this.facingRight && !space.isDown) {
        this.frame = 0;
      }
    }
    if (cursor.up.isDown && this.body.onFloor()) {
      this.body.velocity.y = -550;
    }
    if (space.isDown){
      if(game.currTime - this.lastShot > this.attacks[this.currAttack].coolDown){
      /*if(this.facingLeft){
          this.animations.play('shootLeft');
        } else {
          this.animations.play('shootRight');
        }*/
        this.lastShot = game.currTime;
        this.attacks[this.currAttack].shoot(this.x,this.y,this.width,this.height, this.facingLeft);
      }
    }
  };
  return robot;
}
