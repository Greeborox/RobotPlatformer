Robot.level = {
  create: function() {
    this.cursor = game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.map = game.add.tilemap('level');
    this.map.addTilesetImage('tiles');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.map.setCollision(1);

    this.robot = Robot.createRobot(game);

    game.camera.follow(this.robot, Phaser.Camera.FOLLOW_LOCKON);

    this.plasmaShots = this.game.add.group();
		this.plasmaShots.enableBody = true;
		this.plasmaShots.physicsBodyType = Phaser.Physics.ARCADE;
		this.plasmaShots.createMultiple(20,'plasmaShot');
    this.plasmaShots.setAll('outOfBoundsKill', true);
    this.plasmaShots.setAll('checkWorldBounds', true);

    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('pParticle');
    this.emitter.gravity = 500;
  },
  update: function() {
    //game.debug.body(this.robot);
    this.currTime = this.game.time.now;
    game.physics.arcade.collide(this.robot, this.layer);
    this.moveRobot();
    this.updateShots();
  },
  moveRobot: function() {
    if (this.cursor.left.isDown) {
      this.robot.body.velocity.x = -200;
      if(this.robot.body.onFloor()){
        this.robot.animations.play('walkLeft');
      } else {
        this.robot.frame = 6;
      }
      this.robot.facingLeft = true;
    }
    else if (this.cursor.right.isDown) {
      this.robot.body.velocity.x = 200;
      if(this.robot.body.onFloor()){
        this.robot.animations.play('walkRight');
      } else {
        this.robot.frame = 0;
      }
      this.robot.facingLeft = false;
    } else {
      this.robot.body.velocity.x = 0;
      this.robot.animations.stop();
      if(this.robot.facingLeft){
        this.robot.frame = 6;
      } else {
        this.robot.frame = 0;
      }
    }
    if (this.cursor.up.isDown && this.robot.body.onFloor()) {
      this.robot.body.velocity.y = -550;
    }
    if (this.spaceKey.isDown){
      if(this.currTime - this.lastShot > 250){
        this.lastShot = this.currTime;
        this.shoot(this.robot.facingLeft);
      }
    }
  },
  updateShots: function(){
    game.physics.arcade.collide(this.plasmaShots, this.layer, function(shot){
      this.particleBurst(shot.x,shot.y)
      shot.kill();
    }, null, this);
  },
  shoot: function(facingLeft){
    var shot = this.plasmaShots.getFirstExists(false);
		if(shot) {
			shot.reset(this.robot.x+this.robot.width/2,this.robot.y+this.robot.height/2);
      shot.anchor.setTo(0.5);
      if(facingLeft){
        shot.body.velocity.x = -600;
      } else {
        shot.body.velocity.x = 600;
      }
      shot.body.velocity.y = 0;
		}
  },
  particleBurst: function(x,y){
    this.emitter.x = x;
    this.emitter.y = y;
    this.emitter.start(true, 300, null, 7);
  }
}
