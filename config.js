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
    } else {
      if(door.open){
        door.closeDoor();
      }
    }
  }
}