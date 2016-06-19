var Robot = {}

Robot.init = {
  preload: function() {
    game.load.image('tiles', 'GFX/tiles.png');
    game.load.image('plasmaShot', 'GFX/plasmaShot.png');
    game.load.image('pParticle', 'GFX/plasmaShotParticle.png');
    game.load.tilemap('level', 'levels/level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('robot', 'GFX/robot.png', 102, 120);
  },
  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('level');
  }
}
