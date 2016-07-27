Robot.createHUD = function(game, robot){
  var panel = game.add.sprite(1, 0, 'panel');
  panel.fixedToCamera = true;

  var lifeBar = game.add.sprite(414, 9, 'life');
  lifeBar.fixedToCamera = true;

  lifeBar.update = function(){
    this.frame = robot.lives;
  }

  var scoreCounter = game.add.sprite(779, 9, 'scoreCounter');
  scoreCounter.fixedToCamera = true;

  scoreCounter["digit0"] = game.add.sprite(789, 19, 'digits');
  scoreCounter["digit1"] = game.add.sprite(816, 19, 'digits');
  scoreCounter["digit2"] = game.add.sprite(843, 19, 'digits');
  scoreCounter["digit3"] = game.add.sprite(870, 19, 'digits');
  for (var i = 0; i < 4; i++) {
    var digitNum = 'digit'+i;
    scoreCounter[digitNum].fixedToCamera = true;
  }

  scoreCounter.update = function(){
    if(Robot.points > 9999){
      Robot.points = 9999;
    }
    var tempNum = Robot.points;
    var counter = 3;
    var stillRunning = true;
    while(tempNum > 0){
      var currDigit = "digit"+counter;
      var currFrame = tempNum%10;
      this[currDigit].frame = tempNum%10;
      tempNum = Math.floor(tempNum/10);
      counter -= 1;
    }
  }

  var rocketCounter = game.add.sprite(60, 9, 'rocketCounter');
  rocketCounter.fixedToCamera = true;

  rocketCounter.digit = game.add.sprite(156, 18, 'digits');
  rocketCounter.digit.fixedToCamera = true;

  rocketCounter.update = function(){
    if(robot.rockets > 9) {
      robot.rockets = 9;
    }
    rocketCounter.digit.frame = robot.rockets;
  }
}
