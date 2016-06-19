Robot.createRobot = function(game){
  var robot = game.add.sprite(40, 510, 'robot');
  game.physics.arcade.enable(robot);
  robot.body.setSize(55, 100, 25, 20);
  robot.body.gravity.y = 800;
  robot.body.gravity.y = 800;
  robot.facingLeft = false;
  robot.lastShot = 0;
  robot.animations.add('walkRight', [0,1,2,3,4,5], 8, true);
  robot.animations.add('walkLeft', [6,7,8,9,10,11], 8, true);
  return robot;
}
