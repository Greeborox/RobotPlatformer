Robot.level1 = {
  create: function() {
    this.map = Robot.config.setMap(game,{'tileMap':'level1','tileImage':'tiles'})
    this.layer = Robot.config.setLayer(this.map,'Tile Layer 1')

    this.plasmaShots = Robot.createPlasma(game);
    this.robot = Robot.createRobot(game,40,510,this.plasmaShots);
    this.exit = Robot.createExit(game,992,64);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('pParticle');
    this.emitter.gravity = 500;
  },
  update: function() {
    game.currTime = this.game.time.now;
    game.physics.arcade.collide(this.robot, this.layer);
    this.robot.moveRobot(game.cursor,game.spaceKey);
    this.plasmaShots.update(this.layer);
    Robot.config.checkExit(this.robot,this.exit)
  },
}
