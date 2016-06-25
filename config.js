Robot.config = {
  setMap: function(game,mapData){
    var map = game.add.tilemap(mapData.tileMap);
    map.addTilesetImage(mapData.tileImage);
    map.setCollision(1);
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
  checkEnemiesCollision: function(enemies, layer, doors){
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      for (door in doors) {
        var door = doors[door];
        game.physics.arcade.collide(enemy, door);
      }
      game.physics.arcade.collide(enemy, layer);
    }
  },
}
