var game = new Phaser.Game(952, 736, Phaser.AUTO, 'game');

game.state.add('init', Robot.init);
game.state.add('level1', Robot.level1);
game.state.add('level2', Robot.level2);
game.state.start('init',true,true);
