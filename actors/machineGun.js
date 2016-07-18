Robot.createMachineGun = function(game){
  var gun = new Phaser.Line(0, 0, 0, 0);

  gun.coolDown = 250;
  gun.spacePressed = false;

  gun.emitter = game.add.emitter(0, 0, 100);
  gun.emitter.makeParticles('pParticle');
  gun.emitter.gravity = 500;

  gun.gunfire = game.add.sprite(-100, -100, 'gunfire');
  gun.gunfire.anchor.setTo(.5, 1)
  gun.gunfire.alpha = 0;

  gun.shotSFX = game.add.audio('machineGun');

  gun.particleBurst = function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 200, null, 3);
  };
  gun.shoot = function(roboX, roboY, roboW, roboH, facingLeft){
    this.gunfire.alpha = 1;
    this.shotSFX.play();
    var x1 = roboX+(roboW/2);
    var y1 = roboY+(roboH/2);
    var y2 = y1;
    if(facingLeft){
      x2 = game.camera.x;
    } else {
      x2 = game.camera.x + game.camera.width;
    }
    this.shootLine = new Phaser.Line(x1, y1, x2, y2);
    //game.debug.geom(this.shootLine);
    game.time.events.add(120, function(){
      this.shootLine = undefined;
      this.gunfire.alpha = 0;
      //game.debug.geom(this.shootLine);
    }, this);
  };
  gun.update = function(robot){
    this.gunfire.y=robot.y+robot.height/2+12;
    if(robot.facingLeft){
      this.gunfire.x=robot.x+23;
      this.gunfire.scale.x = -1;
      if(robot.frame == 7 || robot.frame == 10){
        this.gunfire.y -= 5;
        this.gunfire.x -= 15;
      }
    } else {
      this.gunfire.scale.x = 1;
      this.gunfire.x=robot.x+robot.width-22;
      if(robot.frame == 1 || robot.frame == 4){
        this.gunfire.y -= 5;
        this.gunfire.x += 3;
      }
    }
  }
  return gun;
}
