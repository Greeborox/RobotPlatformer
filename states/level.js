Robot.level1 = {
  create: function() {

    this.pickUps = [];
    this.doors = [];
    this.keys = [];
    this.enemies = [];
    this.explosions = [];
    this.enemyShots = [];
    this.lifts = [];
    this.containers = [];

    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 2');
    this.door2 = Robot.createDoor(game,928,224, true,'doorRed');
    this.door1 = Robot.createDoor(game,290,576, false,'doorGreen');
    this.door3 = Robot.createDoor(game,1152,32, true,'doorYellow');
    this.doors.push(this.door2,this.door1,this.door3);
    this.key1 = Robot.createKey(game,832,96,this.door2,'keyRed');
    this.key2 = Robot.createKey(game,1024,608,this.door3, 'keyYellow');
    this.keys.push(this.key1,this.key2);
    this.levikula1 = Robot.createLewikula(game,140,75, this.pickUps,this.explosions);
    this.tank1 = Robot.createTank(game, 270, 270, 192, 416, this.pickUps, this.enemyShots,  this.explosions);
    this.kopter1 = Robot.createKopter(game,296,406, this.pickUps, this.enemyShots, this.explosions);
    this.enemies.push(this.levikula1,this.kopter1,this.tank1);
    this.chest1 = Robot.createContainer(game,844,650,'barrel1', true);
    this.chest2 = Robot.createContainer(game,887,650,'barrel2', false);
    this.containers.push(this.chest1,this.chest2);
    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots,this.machineGun);
    this.exit = Robot.createExit(game,992,61);
    this.HUD = Robot.createHUD(game,this.robot);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.currTime = this.game.time.now;
    this.machineGun.update(this.robot);
    game.physics.arcade.collide(this.robot, this.walls);
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
    }
    for (var i = 0; i < this.containers.length; i++) {
      game.physics.arcade.collide(this.robot, this.containers[i])
    }
    for (var i = 0; i < this.doors.length; i++) {
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    this.plasmaShots.update(this.walls, this.doors, this.containers, this.explosions);
    this.robot.moveRobot(game.cursor,game.ZKey, game.XKey);
    Robot.config.handleEnemyShots(this.enemyShots, this.robot, this.walls, this.doors, this.lifts)
    Robot.config.handlePickUps(this.pickUps, this.walls, this.robot)
    Robot.config.handleExplosions(this.explosions,this.enemies, this.robot, this.containers);
    Robot.config.checkKeys(this.robot,this.keys);
    Robot.config.checkExit(this.robot,this.exit);
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.walls, this.doors, this.plasmaShots, this.explosions);
    Robot.config.handleContainers(this.containers, this.walls, this.pickUps, this.explosions);
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.containers, this.enemies, this.walls, this.doors, this.machineGun)
    }
  },
}
