Robot.createLewikula = function(game,x,y){
  var lewikula = game.add.sprite(x, y, 'lewikula');
  lewikula.animations.add('lewikulaAnim', [0,1,2,3,4,5,6,7], 10, true);
  game.physics.arcade.enable(lewikula);
  lewikula.body.setSize(42, 42, 28, 26);
  lewikula.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
  lewikula.body.bounce.x = 1;

  lewikula.animations.play('lewikulaAnim');

  return lewikula;
}
