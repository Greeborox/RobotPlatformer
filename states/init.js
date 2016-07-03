var Robot = {}

Robot.init = {
  preload: function() {
    game.load.image('tiles', 'GFX/tiles.png');
    game.load.image('plasmaShot', 'GFX/plasmaShot.png');
    game.load.image('exit', 'GFX/exit.png');
    game.load.image('bodyPart', 'GFX/bodyPart.png');
    game.load.image('legPart1', 'GFX/legPart1.png');
    game.load.image('legPart2', 'GFX/legPart2.png');
    game.load.image('headPart', 'GFX/headPart.png');
    game.load.image('gunfire', 'GFX/gunfire.png');
    game.load.image('tile', 'GFX/tile.png');
    game.load.spritesheet('lockedDoor', 'GFX/lockedDoor.png',24, 128);
    game.load.spritesheet('openDoor', 'GFX/openDoor.png',24, 128);
    game.load.spritesheet('door', 'GFX/door.png',24, 128);
    game.load.spritesheet('redKey', 'GFX/keyRed.png',36, 60);
    game.load.image('key', 'GFX/key.png');
    game.load.audio('plasma', 'SFX/plasma.wav');
    game.load.audio('machineGun', 'SFX/machineGun.wav');
    game.load.audio('getKey', 'SFX/keyPickup.wav');
    game.load.audio('door', 'SFX/door.wav');
    game.load.audio('doorLocked', 'SFX/doorLocked.wav');
    game.load.image('pParticle', 'GFX/plasmaShotParticle.png');
    game.load.tilemap('level1', 'levels/level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('robot', 'GFX/robot.png', 102, 120);
    game.load.spritesheet('lewikula', 'GFX/lewikula.png', 96, 96);
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
