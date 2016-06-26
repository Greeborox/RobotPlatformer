Robot.config = {
  setMap: function(game,mapData){
    var map = game.add.tilemap(mapData.tileMap);
    map.addTilesetImage(mapData.tileImage);
    map.setCollisionBetween(1,4);
    return map
  },
  setLayer: function(map,name){
    var layer = map.createLayer(name);
    layer.resizeWorld();
    return layer
  },
  checkExit: function(robot,exit){
    var boundsR = robot.getBounds();
    var boundsE = exit.getBounds();
    if (Phaser.Rectangle.intersects(boundsR, boundsE)){
      game.currLevel++;
      if(game.currLevel === game.levels.length){
        game.currLevel = 0;
      }
      game.state.start(game.levels[game.currLevel]);
    }
  },
  handleDoor: function(robot,door){
    var boundsR = robot.getBounds();
    var boundsD = door.openZone.getBounds();
    if(Phaser.Rectangle.intersects(boundsR, boundsD) && !door.open){
      door.openDoor();
    }
    if(!Phaser.Rectangle.intersects(boundsR, boundsD) && door.open){
      door.closeDoor();
    }
  },
  checkKeys: function(robot,keys){
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var boundsR = robot.getBounds();
      var boundsK = key.getBounds();
      if(Phaser.Rectangle.intersects(boundsR, boundsK)){
        key.door.locked = false;
        key.door.animations.play('openDoorAnim')
        if(key.alive){
          key.getKeySFX.play();
        }
        key.kill();
      } else {

      }
    }
  },
  checkEnemiesCollision: function(robot, enemies, layer, doors, plasmas){
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      for (door in doors) {
        var door = doors[door];
        game.physics.arcade.collide(enemy, door);
      }
      game.physics.arcade.overlap(enemy, plasmas, function(e,p){
        e.kill();
        plasmas.particleBurst(p.x,p.y);
        p.kill();
      }, null, this);
      game.physics.arcade.collide(enemy, layer);
      game.physics.arcade.overlap(robot, enemy, this.robotDie, null, this);
    }
  },
  robotDie: function(robot){
    robot.particleBurst(robot.x,robot.y)
    robot.kill();
    game.time.events.add(700, function(){
      game.state.start(game.levels[game.currLevel]);
    }, this);
  }
}
