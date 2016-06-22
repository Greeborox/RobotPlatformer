Robot.createDoor = function(game,x,y){
  var door = game.add.sprite(x, y, 'door');;
  game.physics.arcade.enable(door);
  door.body.immovable = true

  door.open = false;

  door.openZone = game.add.sprite(x-64, y);
  game.physics.arcade.enable(door.openZone);
  door.openZone.body.setSize(door.width*5, door.height);

  door.openDoor = function(){
    console.log('open');
    this.open = true;
  }

  door.openDoor = function(){
    console.log('close');
    this.open = false;
  }

  return door;
}
