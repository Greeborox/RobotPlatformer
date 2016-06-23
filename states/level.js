Robot.level1 = {
  create: function() {
    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.layer = Robot.config.setLayer(this.map,'Tile Layer 1')
    this.door1 = Robot.createDoor(game,320,576);
    this.door2 = Robot.createDoor(game,384,576);
    this.doors = [];
    this.doors.push(this.door1,this.door2);

    this.plasmaShots = Robot.createPlasma(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots);
    this.exit = Robot.createExit(game,992,64);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

  },
  update: function() {
    game.currTime = this.game.time.now;
    game.physics.arcade.collide(this.robot, this.layer)
    for (var i = 0; i < this.doors.length; i++) {
      game.physics.arcade.collide(this.robot, this.doors[i])
    }
    for (var i = 0; i < this.doors.length; i++) {
      Robot.config.handleDoor(this.robot, this.doors[i]);
    }
    this.plasmaShots.update(this.layer, this.door1);
    this.robot.moveRobot(game.cursor,game.spaceKey);
    Robot.config.checkExit(this.robot,this.exit)
  },
}
