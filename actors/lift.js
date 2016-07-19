Robot.createLift = function(game,x,y,maxY,minY,active){
  var lift = game.add.sprite(x, y, 'lift');

  game.physics.arcade.enable(lift);
  lift.body.immovable = true;

  lift.active = active;
  lift.goingUp = true;
  lift.pausing = false;

  lift.update = function(){
    if(this.active && !this.pausing){
      if(this.goingUp){
        this.body.velocity.y = -96;
      } else {
        this.body.velocity.y = 96;
      }
    } else {
      this.body.velocity.y = 0;
    }
    if(this.y >= maxY && !this.goingUp){
      this.pausing = true;
      this.goingUp = true;
      game.time.events.add(500, function(){this.pausing = false}, this);
    }
    if(this.y <= minY && this.goingUp){
      this.pausing = true;
      this.goingUp = false;
      game.time.events.add(500, function(){this.pausing = false}, this);
    }

  }

  return lift;
}
