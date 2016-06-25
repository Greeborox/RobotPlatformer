Robot.createKey = function(game,x,y,door){
  var key = game.add.sprite(x, y, 'redKey');
  key.animations.add('keyAnim', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22], 10, true);
  key.scale.setTo(0.7);
  game.physics.arcade.enable(key);

  key.animations.play('keyAnim');

  key.getKeySFX = game.add.audio('getKey');
  key.door = door;
  key.anchor.setTo(0.5, 0.5);

  return key;
}
