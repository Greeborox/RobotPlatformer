Robot.config = {
  setMap: function(game,mapData){
    var map = game.add.tilemap(mapData.tileMap);
    map.addTilesetImage(mapData.tileImage);
    map.setCollisionBetween(1,15);
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
      }
    }
  },
  checkSwitches: function(robot,switches){
    for (var i = 0; i < switches.length; i++) {
      var currSwitch = switches[i];
      var boundsR = robot.getBounds();
      var boundsS = currSwitch.getBounds();
      if(Phaser.Rectangle.intersects(boundsR, boundsS)){
        currSwitch.switchSwitch();
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
        plasmas.createExplosion(p.x,p.y);
        p.kill();
      }, null, this);
      for (explo in plasmas.explosions) {
        var explo = plasmas.explosions[explo];
        game.physics.arcade.overlap(enemy, explo, function(e){
          e.HP -= 5;
        }, null, this);
        game.physics.arcade.overlap(robot, explo, this.robotDie, null, this);
      }
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
  },
  checkMachineGunHits: function(robot, enemies, layer, doors, MG){
    var line = MG.shootLine;
    var closestObj;
    var closestObjDist = 1000000;
    var dist;
    var enemyHit = false;
    tileHits = layer.getRayCastTiles(line, 4, false, false);
    for (var i = 0; i < tileHits.length; i++) {
      if(tileHits[i].collideLeft){
        dist = Math.abs(robot.x-tileHits[i].x*32);
        if(dist < closestObjDist){
          closestObj = tileHits[i];
          closestObjDist = dist;
          enemyHit = false;
        }
      }
    }
    for (door in doors) {
      var door = doors[door];
      var doorLine = new Phaser.Line(door.x, door.y, door.x, door.y+door.height);
      if(line.intersects(doorLine, true)){
        dist = Math.abs(robot.x-door.x);
        if(dist < closestObjDist){
          closestObj = door;
          closestObjDist = dist;
          enemyHit = false;
        }
      };
    }
    for (enemy in enemies) {
      var enemy = enemies[enemy];
      var enemyLine = new Phaser.Line(enemy.x, enemy.y, enemy.x, enemy.y+enemy.height);
      if(line.intersects(enemyLine, true)){
        dist = Math.abs(robot.x-enemy.x);
        if(dist < closestObjDist){
          closestObj = enemy;
          closestObjDist = dist;
          enemyHit = true;
        }
      };
    }
    if(closestObj){
      var x;
      if(closestObj.hasOwnProperty('collideLeft')){
        x = closestObj.x*32;
      } else {
        x = closestObj.x
      }
      if(robot.facingLeft){
        MG.particleBurst(x+closestObj.width,line.y);
      } else {
        MG.particleBurst(x,line.y);
      }
      if(enemyHit){
        closestObj.HP -= 1;
      }
    }
  },
  handlePickUps: function(powerups, layer, robot){
    for (var i = 0; i < powerups.length; i++) {
      game.physics.arcade.collide(powerups[i], layer);
      game.physics.arcade.overlap(powerups[i], robot, function(p,r){
        p.pickUp(robot);
        p.kill();
      }, null, this);
    }
  }
}
