Robot.level3 = {
  create: function() {
    this.pickUps = [];
    this.doors = [];
    this.keys = [];
    this.enemies = [];
    this.explosions = [];
    this.enemyShots = [];
    this.lifts = [];
    this.containers = [];
    this.switches = [];

    this.map = Robot.config.setMap(game,{'tileMap':'level3','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 1');

    this.lift1 = Robot.createLift(game, 1472, 3520, 3808, 3520, false);
    this.lift2 = Robot.createLift(game, 3648, 2016, 2176, 576, false);
    this.lifts.push(this.lift1, this.lift2);
    this.switch1 = Robot.createSwitch(game, 2346,3360,this.lift1);
    this.switch2 = Robot.createSwitch(game, 3584,2368,this.lift2);
    this.switches.push(this.switch1,this.switch2);

    this.door1 = Robot.createDoor(game,992,3680, false,'doorRed');
    this.door2 = Robot.createDoor(game,2304,3680, false,'doorRed');
    this.door3 = Robot.createDoor(game,2976,3168, false,'doorRed');
    this.door4 = Robot.createDoor(game,3652,2400, true,'doorRed');
    this.doors.push(this.door2,this.door1,this.door3,this.door4);
    this.key1 = Robot.createKey(game,3328,1920,this.door4, 'keyRed');
    this.keys.push(this.key1);

    this.chest1 = Robot.createContainer(game,32,3450,'barrel1', true);
    this.chest2 = Robot.createContainer(game,1152,3712,'barrel2', true);
    this.chest3 = Robot.createContainer(game,1664,3712,'barrel3', false);
    this.chest4 = Robot.createContainer(game,2144,3712,'barrel1', false);
    this.chest5 = Robot.createContainer(game,1800,3712,'barrel2', true);
    this.chest6 = Robot.createContainer(game,3296,3392,'barrel1', false);
    this.chest7 = Robot.createContainer(game,2688,3392,'barrel2', true);
    this.containers.push(this.chest1, this.chest2, this.chest3, this.chest4, this.chest5, this.chest6, this.chest7)

    this.kopter1 = Robot.createKopter(game,320,3584, this.pickUps, this.enemyShots, this.explosions);
    this.kopter2 = Robot.createKopter(game,640,3584, this.pickUps, this.enemyShots, this.explosions);
    //this.kopter3 = Robot.createKopter(game,3040,288, this.pickUps, this.enemyShots, this.explosions);
    this.levikula1 = Robot.createLewikula(game,1152,3712, this.pickUps,this.explosions);
    this.levikula2 = Robot.createLewikula(game,1664,3712, this.pickUps,this.explosions);
    this.levikula3 = Robot.createLewikula(game,2144,3712, this.pickUps,this.explosions);
    this.levikula4 = Robot.createLewikula(game,1800,3712, this.pickUps,this.explosions);
    this.tank1 = Robot.createTank(game, 3072, 3712, 2688, 3456, this.pickUps, this.enemyShots, this.explosions);
    this.enemies.push(this.kopter1,this.kopter2,this.levikula1,this.levikula2,this.levikula3,this.levikula4,this.tank1);

    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,384,278,this.plasmaShots,this.machineGun);
    //this.robot = Robot.createRobot(game,1856,3392,this.plasmaShots,this.machineGun);
    this.HUD = Robot.createHUD(game,this.robot);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);
  },
  update: function() {

    game.currTime = this.game.time.now;
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    for (var i = 0; i < this.lifts.length; i++) {
      game.physics.arcade.collide(this.robot, this.lifts[i])
    }
    for (var i = 0; i < this.containers.length; i++) {
      game.physics.arcade.collide(this.robot, this.containers[i])
    }
    this.machineGun.update(this.robot);
    game.physics.arcade.collide(this.robot, this.walls);
    this.plasmaShots.update(this.walls, this.doors, this.containers, this.explosions);
    this.robot.moveRobot(game.cursor,game.ZKey, game.XKey);

    Robot.config.checkSwitches(this.robot,this.switches);
    Robot.config.handleContainers(this.containers, this.walls, this.pickUps, this.explosions);

    Robot.config.handleExplosions(this.explosions, this.enemies, this.robot, this.containers);
    Robot.config.handleEnemyShots(this.enemyShots, this.robot, this.walls, this.doors, this.lifts)
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.walls, this.doors, this.plasmaShots, this.explosions);

    Robot.config.handlePickUps(this.pickUps, this.walls, this.robot)
    Robot.config.checkKeys(this.robot,this.keys);

    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.containers, this.enemies, this.walls, this.doors, this.machineGun)
    }
  }
}
