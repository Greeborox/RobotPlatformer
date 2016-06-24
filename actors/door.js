Robot.createDoor = function(game,x,y,locked){
  var door = game.add.sprite(x, y, 'door');
  game.physics.arcade.enable(door);
  door.body.immovable = true

  door.locked = locked;
  door.open = false;
  door.tween = undefined;//game.add.tween(door);
  door.doorSFX = game.add.audio('door');
  door.doorLockedSFX = game.add.audio('doorLocked');

  door.openZone = game.add.sprite(x-64, y);
  game.physics.arcade.enable(door.openZone);
  door.openZone.body.setSize(door.width, door.height);
  door.openZone.width = 160;

  door.openDoor = function(){
    if(!this.locked){
      this.doorSFX.play()
      if(this.tween && this.tween.isRunning){
        this.tween.stop();
      }
      this.tween = game.add.tween(this)
      this.open = true;
      this.tween.to({height: 0}, 500);
      this.tween.start();
    } else {
      this.doorLockedSFX.play()
      this.open = true;
    }
  }

  door.closeDoor = function(){
    if(!this.locked){
      this.doorSFX.play()
      if(this.tween && this.tween.isRunning){
        this.tween.stop();
      }
      this.tween = game.add.tween(this)
      this.open = false;
      this.tween.to({height: 128}, 500);
      this.tween.start();
    } else {
      this.open = false;
    }
  }

  return door;
}
