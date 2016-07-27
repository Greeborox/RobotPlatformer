Robot.createAmmo = function(game,x,y){
  ammo = game.add.sprite(x, y, 'ammo');
  game.physics.arcade.enable(ammo);
  ammo.body.gravity.y = 600;
  ammo.body.velocity.y = -150;

  ammo.pickUp = function(robot){
    robot.rockets += 1;
  }

  return ammo
}

Robot.createTreasure = function(game,x,y){
  var treasureNum = game.rnd.integerInRange(0, 5)
  treasureType = 'treasure'+treasureNum;
  treasure = game.add.sprite(x, y, treasureType);
  game.physics.arcade.enable(treasure);
  treasure.body.gravity.y = 600;
  treasure.body.velocity.y = -150;

  treasure.pickUp = function(){
    Robot.points += Robot.treasureValues[treasureNum];
  }

  return treasure
}

Robot.treasureValues = [5,8,13,15,20,27];
