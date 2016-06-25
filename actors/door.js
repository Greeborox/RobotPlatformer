Robot.createDoor = function(game,x,y,locked){
  var door = game.add.sprite(x, y, 'door');

  door.animations.add('openDoorAnim', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 10, true);
  door.animations.add('closedDoorAnim', [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41], 10, true);
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
  if(locked){
    door.animations.play('closedDoorAnim')
  } else {
    door.animations.play('openDoorAnim')
  }

  door.openDoor = function(){
    if(!this.locked){
      this.doorSFX.play()
      if(this.tween && this.tween.isRunning){
        this.tween.stop();
      }
      this.tween = game.add.tween(this)
      this.open = true;
      this.tween.to({height: 0}, 300);
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
      this.tween.to({height: 128}, 300);
      this.tween.start();
    } else {
      this.open = false;
    }
  }

  return door;
}
