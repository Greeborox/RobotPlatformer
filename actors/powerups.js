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
