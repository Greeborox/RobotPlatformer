Robot.level2 = {
  create: function() {
    this.map = Robot.config.setMap(game,{'tileMap':'level2','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 2');
    this.layer = Robot.config.setLayer(this.map,'Tile Layer 1');
    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,32,32,this.plasmaShots,this.machineGun);
    this.exit = Robot.createExit(game,64,768);

    this.doors = [];
    this.keys = [];
    this.enemies = [];

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.currTime = this.game.time.now;
    this.machineGun.update(this.robot);
    game.physics.arcade.collide(this.robot, this.layer);
    this.robot.moveRobot(game.cursor,game.spaceKey);
    this.plasmaShots.update(this.layer);
    Robot.config.checkExit(this.robot,this.exit)
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.enemies, this.layer, this.doors, this.machineGun)
    }
  },
}
