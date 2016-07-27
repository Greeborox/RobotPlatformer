var game = new Phaser.Game(952, 736, Phaser.AUTO, 'game');

game.state.add('init', Robot.init);
game.state.add('splash', Robot.splash);
game.state.add('level1', Robot.level1);
game.state.add('level2', Robot.level2);
game.state.add('level3', Robot.level3);
game.state.add('level4', Robot.level4);
game.state.start('init',true,true);
