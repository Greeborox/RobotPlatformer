var Robot = {}

Robot.init = {
  preload: function() {
    game.load.image('tiles', 'GFX/tiles.png');
    game.load.image('plasmaShot', 'GFX/plasmaShot.png');
    game.load.image('exit', 'GFX/exit.png');
    game.load.audio('plasma', 'SFX/plasma.wav');
    game.load.image('pParticle', 'GFX/plasmaShotParticle.png');
    game.load.tilemap('level1', 'levels/level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('robot', 'GFX/robot.png', 102, 120);
  },
  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.cursor = game.input.keyboard.createCursorKeys();
    game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.currTime;
    game.levels = ['level1','level2'];
    game.currLevel = 0;
    game.state.start(game.levels[game.currLevel]);
  }
}
