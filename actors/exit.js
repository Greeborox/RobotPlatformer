Robot.createExit = function(game,x,y){
  var exit = game.add.sprite(x, y, 'exit');

  exit.animations.add('exitAnim', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 10, true);
  exit.animations.play('exitAnim');

  return exit;
}
