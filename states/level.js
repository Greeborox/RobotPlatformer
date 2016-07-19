Robot.level1 = {
  create: function() {
    this.pickUps = [];
    this.doors = [];
    this.keys = [];
    this.enemies = [];
    this.ammoTest = Robot.createAmmo(game, 240, 620)
    this.pickUps.push(this.ammoTest);
    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 1');
    this.door1 = Robot.createDoor(game,320,576, false);
    this.door2 = Robot.createDoor(game,928,224, true);
    this.door3 = Robot.createDoor(game,1152,32, true);
    this.doors.push(this.door1,this.door2,this.door3);
    this.key1 = Robot.createKey(game,832,96,this.door2);
    this.key2 = Robot.createKey(game,1024,608,this.door3);
    this.keys.push(this.key1,this.key2);
    this.levikula1 = Robot.createLewikula(game,140,75, this.pickUps);
    this.levikula2 = Robot.createLewikula(game,240,245, this.pickUps);
    this.enemies.push(this.levikula1,this.levikula2);
    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots,this.machineGun);
    this.exit = Robot.createExit(game,992,64);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    this.machineGun.update(this.robot);
    game.currTime = this.game.time.now;
    game.physics.arcade.collide(this.robot, this.walls);
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
    }
    for (var i = 0; i < this.doors.length; i++) {
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    this.plasmaShots.update(this.walls, this.doors);
    this.robot.moveRobot(game.cursor,game.spaceKey,game.ZKey);
    Robot.config.handlePickUps(this.pickUps, this.walls, this.robot)
    Robot.config.checkKeys(this.robot,this.keys);
    Robot.config.checkExit(this.robot,this.exit);
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.walls, this.doors, this.plasmaShots);
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.enemies, this.walls, this.doors, this.machineGun)
    }
  },
}
