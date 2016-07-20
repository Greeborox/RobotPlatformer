Robot.level1 = {
  create: function() {
    this.pickUps = [];
    this.doors = [];
    this.keys = [];
    this.enemies = [];
    this.explosions = [];
    this.enemyShots = [];
    this.lifts = [];
    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 2');
    this.door1 = Robot.createDoor(game,320,576, false);
    this.door2 = Robot.createDoor(game,928,224, true);
    this.door3 = Robot.createDoor(game,1152,32, true);
    this.doors.push(this.door1,this.door2,this.door3);
    this.key1 = Robot.createKey(game,832,96,this.door2);
    this.key2 = Robot.createKey(game,1024,608,this.door3);
    this.keys.push(this.key1,this.key2);
    this.levikula1 = Robot.createLewikula(game,140,75, this.pickUps);
    this.tank1 = Robot.createTank(game, 270, 270, 192, 416, this.pickUps, this.enemyShots);
    this.kopter1 = Robot.createKopter(game,296,406, this.pickUps, this.enemyShots);
    this.enemies.push(this.levikula1,this.kopter1,this.tank1);
    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots,this.machineGun);
    this.exit = Robot.createExit(game,992,64);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.debug.text(`Robot Lives ${this.robot.lives}`, 20, 20, 'yellow', 'Segoe UI');
    game.debug.text(`Robot Rockets ${this.robot.rockets}`, 20, 50, 'yellow', 'Segoe UI');
    game.debug.text(`Tank HP ${this.tank1.HP}`, 20, 80, 'yellow', 'Segoe UI');
    game.currTime = this.game.time.now;
    this.machineGun.update(this.robot);
    game.physics.arcade.collide(this.robot, this.walls);
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
    }
    for (var i = 0; i < this.doors.length; i++) {
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    this.plasmaShots.update(this.walls, this.doors, this.explosions);
    this.robot.moveRobot(game.cursor,game.ZKey, game.XKey);
    Robot.config.handleEnemyShots(this.enemyShots, this.robot, this.walls, this.doors, this.lifts)
    Robot.config.handlePickUps(this.pickUps, this.walls, this.robot)
    Robot.config.handleExplosions(this.explosions,this.enemies, this.robot);
    Robot.config.checkKeys(this.robot,this.keys);
    Robot.config.checkExit(this.robot,this.exit);
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.walls, this.doors, this.plasmaShots, this.explosions);
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.enemies, this.walls, this.doors, this.machineGun)
    }
  },
}
