Robot.createKey = function(game,x,y,door){
  var key = game.add.sprite(x, y, 'key');
  game.physics.arcade.enable(key);

  key.getKeySFX = game.add.audio('getKey');
  key.door = door;
  key.anchor.setTo(0.5, 0.5);

  key.update = function(){
    this.rotation += 0.01;
  }

  return key;
}
