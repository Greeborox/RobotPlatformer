Robot.level4 = {
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

    this.map = Robot.config.setMap(game,{'tileMap':'level4','tileImage':'tiles'})
    this.walls = Robot.config.setLayer(this.map,'Tile Layer 1');

    this.lift1 = Robot.createLift(game, 1472, 960, 1248, 960, false);
    this.lifts.push(this.lift1);
    this.switch1 = Robot.createSwitch(game, 2368,896,this.lift1);
    this.switches.push(this.switch1);

    this.door1 = Robot.createDoor(game,992,1120, false,'doorRed');
    this.door2 = Robot.createDoor(game,2304,1120, false,'doorRed');
    this.door3 = Robot.createDoor(game,2368,608, true,'doorRed');
    this.doors.push(this.door2,this.door1,this.door3);
    this.key1 = Robot.createKey(game,448,320,this.door3, 'keyRed');
    this.keys.push(this.key1);

    this.chest1 = Robot.createContainer(game,32,1152,'barrel1', true);
    this.chest2 = Robot.createContainer(game,1152,1152,'barrel2', true);
    this.chest3 = Robot.createContainer(game,1664,1152,'barrel3', false);
    this.chest4 = Robot.createContainer(game,2144,1152,'barrel1', false);
    this.chest5 = Robot.createContainer(game,1800,1152,'barrel2', true);
    this.chest6 = Robot.createContainer(game,896,768,'barrel1', false);
    this.chest7 = Robot.createContainer(game,992,768,'barrel2', true);
    this.chest8 = Robot.createContainer(game,1334,768,'barrel1', false);
    this.chest9 = Robot.createContainer(game,2400,928,'barrel2', true);
    this.containers.push(this.chest1, this.chest2, this.chest3, this.chest4, this.chest5, this.chest6, this.chest7, this.chest8,
      this.chest9)

    this.kopter1 = Robot.createKopter(game,320,1024, this.pickUps, this.enemyShots, this.explosions);
    this.kopter2 = Robot.createKopter(game,640,1024, this.pickUps, this.enemyShots, this.explosions);
    this.kopter3 = Robot.createKopter(game,480,224, this.pickUps, this.enemyShots, this.explosions);
    this.kopter4 = Robot.createKopter(game,1984,224, this.pickUps, this.enemyShots, this.explosions);
    this.levikula1 = Robot.createLewikula(game,640,864, this.pickUps,this.explosions);
    this.levikula2 = Robot.createLewikula(game,1200,864, this.pickUps,this.explosions);
    this.levikula3 = Robot.createLewikula(game,2800,864, this.pickUps,this.explosions);
    this.levikula4 = Robot.createLewikula(game,2176,864, this.pickUps,this.explosions);
    this.enemies.push(this.kopter1,this.kopter2,this.kopter3,this.kopter4
    ,this.levikula1,this.levikula2,this.levikula3,this.levikula4);

    this.plasmaShots = Robot.createPlasma(game);
    this.machineGun = Robot.createMachineGun(game);
    this.robot = Robot.createRobot(game,236,300,this.plasmaShots,this.machineGun);

    this.exit = Robot.createExit(game,2432,638);

    this.HUD = Robot.createHUD(game,this.robot);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);
  },
  update: function() {
    game.currTime = this.game.time.now;

    for (var i = 0; i < this.lifts.length; i++) {
      game.physics.arcade.collide(this.robot, this.lifts[i])
    }
    for (var i = 0; i < this.containers.length; i++) {
      game.physics.arcade.collide(this.robot, this.containers[i])
    }
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    game.physics.arcade.collide(this.robot, this.walls);
    this.robot.moveRobot(game.cursor,game.ZKey, game.XKey);
    Robot.config.checkSwitches(this.robot,this.switches);
    Robot.config.checkKeys(this.robot,this.keys);
    Robot.config.checkExit(this.robot,this.exit);
    Robot.config.handleContainers(this.containers, this.walls, this.pickUps, this.explosions);
    Robot.config.handlePickUps(this.pickUps, this.walls, this.robot)

    Robot.config.handleExplosions(this.explosions, this.enemies, this.robot, this.containers);
    Robot.config.handleEnemyShots(this.enemyShots, this.robot, this.walls, this.doors, this.lifts)
    Robot.config.checkEnemiesCollision(this.robot, this.enemies, this.walls, this.doors, this.plasmaShots, this.explosions);

    this.machineGun.update(this.robot);
    if(this.machineGun.shootLine){
      Robot.config.checkMachineGunHits(this.robot, this.containers, this.enemies, this.walls, this.doors, this.machineGun)
    }
    this.plasmaShots.update(this.walls, this.doors, this.containers, this.explosions);
  }
}
