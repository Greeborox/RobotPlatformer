var game = new Phaser.Game(952, 736, Phaser.AUTO, 'game');

game.state.add('init', Robot.init);
game.state.add('level', Robot.level);
game.state.start('init',true,true);
