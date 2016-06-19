var Robot = {}

Robot.createRobot = function(){
  console.log("testtest");
}

Robot.robot = game.add.sprite(40, 510, 'robot');
game.physics.arcade.enable(Robot.robot);
Robot.robot.body.setSize(55, 100, 25, 20);
Robot.robot.body.gravity.y = 800;
Robot.robot.body.gravity.y = 800;
Robot.robot.facingLeft = false;
Robot.robot.lastShot = 0;
