Robot.createDoor = function(game,x,y){
  var door = game.add.sprite(x, y, 'door');;
  game.physics.arcade.enable(door);
  door.body.immovable = true

  door.open = false;
  door.tween = undefined;//game.add.tween(door);

  door.openZone = game.add.sprite(x-64, y);
  game.physics.arcade.enable(door.openZone);
  door.openZone.body.setSize(door.width, door.height);
  door.openZone.width = 160;

  door.openDoor = function(){
    if(this.tween && this.tween.isRunning){
      this.tween.stop();
    }
    this.tween = game.add.tween(this)
    this.open = true;
    this.tween.to({height: 0}, 500);
    this.tween.start();
  }

  door.closeDoor = function(){
    if(this.tween && this.tween.isRunning){
      this.tween.stop();
    }
    this.tween = game.add.tween(this)
    this.open = false;
    this.tween.to({height: 128}, 500);
    this.tween.start();
  }

  return door;
}
