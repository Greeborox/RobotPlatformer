Robot.createDoor = function(game,x,y,locked,type){
  var door = game.add.sprite(x, y, type);

  door.animations.add('closedDoorAnim', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 10, true);
  door.animations.add('openDoorAnim', [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41], 10, true);
  door.animations.add('closing', [48,47,46,45,44,43,42], 25, true);
  door.animations.add('opening', [42,43,44,45,46,47,48], 25, true);

  game.physics.arcade.enable(door);
  door.body.immovable = true

  door.locked = locked;
  door.open = false;
  door.doorSFX = game.add.audio('door');
  door.doorLockedSFX = game.add.audio('doorLocked');

  door.openZone = game.add.sprite(x-64, y);
  game.physics.arcade.enable(door.openZone);
  door.openZone.body.setSize(32, 32);
  door.openZone.width = 160;
  door.openZone.height = 128;
  if(locked){
    door.animations.play('closedDoorAnim')
  } else {
    door.animations.play('openDoorAnim')
  }

  door.openDoor = function(){
    if(!this.locked){
      this.doorSFX.play();
      this.open = true;
      this.animations.play('opening');
    } else {
      this.doorLockedSFX.play()
      this.open = true;
    }
  }

  door.closeDoor = function(){
    if(!this.locked){
      this.doorSFX.play();
      this.open = false;
      this.height = 128;
      this.animations.play('closing');
    } else {
      this.open = false;
    }
  }

  door.update = function(){
    if(this.frame === 48 && this.open){
      this.animations.stop();
      this.height = 0;
    }
    if(this.frame === 42 && !this.open){
      door.animations.play('openDoorAnim');
    }
  }

  return door;
}
