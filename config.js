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
  checkEnemiesCollision: function(robot, enemies, layer, doors, plasmas, explos){
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      for (door in doors) {
        var door = doors[door];
        game.physics.arcade.collide(enemy, door);
      }
      game.physics.arcade.overlap(enemy, plasmas, function(e,p){
        explos.push(plasmas.createExplosion(p.x,p.y));
        p.kill();
      }, null, this);
      for (explo in explos) {
        var explo = explos[explo];
        game.physics.arcade.overlap(enemy, explo, function(e){
          e.HP -= 5;
        }, null, this);
      }
      game.physics.arcade.collide(enemy, layer);
      game.physics.arcade.overlap(robot, enemy, this.robotHit, null, this);
    }
  },
  robotDie: function(robot){
    robot.particleBurst(robot.x,robot.y)
    robot.kill();
    game.time.events.add(700, function(){
      game.state.start(game.levels[game.currLevel]);
    }, this);
  },
  robotHit: function(robot){
    if(!robot.hit){
      robot.lives --;
      robot.hit = true;
      for (var i = 0; i < 6; i++) {
        if(i%2 === 0){
          game.time.events.add(200*i, function(){robot.alpha = 0;}, this);
        } else {
          game.time.events.add(200*i, function(){robot.alpha = 1}, this);
        }
        game.time.events.add(200*6, function(){
          robot.hit = false;
          robot.alpha = 1;
        }, this);
      }
    }
    if(robot.lives <= 0){
      this.robotDie(robot);
    }
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
      if(!powerups[i].alive){
        powerups.splice(i,1);
      }
      game.physics.arcade.collide(powerups[i], layer);
      game.physics.arcade.overlap(powerups[i], robot, function(p,r){
        p.pickUp(robot);
        p.kill();
      }, null, this);
    }
  },
  handleExplosions: function(explos, enemies, robot){
    for (var i = 0; i < explos.length; i++) {
      if(!explos[i].alive){
        explos.splice(i,1);
      }
      game.physics.arcade.overlap(robot, explos[i], this.robotHit, null, this);
    }
  },
  handleEnemyShots: function(shots, robot, layer, doors, lifts){
    for (var i = 0; i < shots.length; i++) {
      var shot = shots[i];
      game.physics.arcade.collide(shot, layer, function(shot){
        shots.splice(i,1);
        shot.remove();
      }, null, this);
      game.physics.arcade.collide(shot, robot, function(shot,robot){
        shots.splice(i,1);
        shot.remove();
        this.robotHit(robot);
      }, null, this);
      for (door in doors) {
        var door = doors[door];
        game.physics.arcade.collide(shot, door, function(shot,door){
          shots.splice(i,1);
          shot.remove();
        }, null, this);
      }
      for (lift in lifts) {
        var lift = lifts[lift];
        game.physics.arcade.collide(shot, lift, function(shot,lift){
          shots.splice(i,1);
          shot.remove();
        }, null, this);
      }
    }
  }
}
