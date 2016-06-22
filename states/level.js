Robot.level1 = {
  create: function() {
    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.layer = Robot.config.setLayer(this.map,'Tile Layer 1')

    this.plasmaShots = Robot.createPlasma(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots);
    this.exit = Robot.createExit(game,992,64);
    this.door1 = Robot.createDoor(game,320,576);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.debug.body(this.door1.openZone);
    game.currTime = this.game.time.now;
    game.physics.arcade.collide(this.robot, this.layer)
    game.physics.arcade.collide(this.robot, this.door1);
    Robot.config.handleDoor(this.robot, this.door1);
    this.robot.moveRobot(game.cursor,game.spaceKey);
    this.plasmaShots.update(this.layer);
    Robot.config.checkExit(this.robot,this.exit)
  },
}
