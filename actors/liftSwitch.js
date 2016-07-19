Robot.createSwitch = function(game,x,y,lift){
  var liftSwitch = game.add.sprite(x, y, 'liftSwitch');
  liftSwitch.animations.add('switchAnim', [0,1,2,3,4,5,6,7,8,9,10,11], 15, true);
  game.physics.arcade.enable(liftSwitch);

  liftSwitch.lift = lift;
  liftSwitch.switched = false;

  liftSwitch.switchSwitch = function(){
    if(!this.switched){
      this.switched = true;
      this.animations.play('switchAnim');
    }
  }

  liftSwitch.update = function(){
    if(this.frame === 11 && !this.lift.active){
      this.animations.stop(null, true);
      this.frame = 11;
      this.lift.active = true;
    }
  }

  return liftSwitch;
}
