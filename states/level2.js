Robot.level2 = {
  create: function() {

    this.doors = [];
    this.keys = [];
    this.enemies = [];
    this.lifts = [];
    this.switches = [];

    this.map = Robot.config.setMap(game,{'tileMap':'level2','tileImage':'tiles'})
    //this.walls = Robot.config.setLayer(this.map,'Tile Layer 2');
    this.layer = Robot.config.setLayer(this.map,'Tile Layer 2');
    this.lift1 = Robot.createLift(game, 704, 192, 860, 192, false);
    this.lifts.push(this.lift1);
    this.switch1 = Robot.createSwitch(game, 1024,64,this.lift1);
    this.switches.push(this.switch1);
    this.levikula3 = Robot.createLewikula(game,928,928);
    this.levikula4 = Robot.createLewikula(game,800,1152);
    this.enemies.push(this.levikula3,this.levikula4);

    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,32,32,this.plasmaShots,this.machineGun);
    this.exit = Robot.createExit(game,64,768);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.currTime = this.game.time.now;
    for (var i = 0; i < this.lifts.length; i++) {
      game.physics.arcade.collide(this.robot, this.lifts[i])
    }
    game.physics.arcade.collide(this.robot, this.layer);
    this.robot.moveRobot(game.cursor,game.spaceKey,game.ZKey);
    this.machineGun.update(this.robot);
    this.plasmaShots.update(this.layer);
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.layer, this.doors, this.plasmaShots);
    Robot.config.checkSwitches(this.robot,this.switches);
    Robot.config.checkExit(this.robot,this.exit)
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.enemies, this.layer, this.doors, this.machineGun)
    }
  },
}
