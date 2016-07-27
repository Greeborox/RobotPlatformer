Robot.splash = {
  create: function() {
    this.splash = game.add.sprite(0, 0, 'splash');
    this.pressKey = game.add.sprite(0, 650, 'pressKey');
    this.pressKey.alpha = 0;
    this.logo = game.add.sprite(0, -230, 'logo');
    this.logoVisible = false;
    this.tweenLogo = game.add.tween(this.logo).to( { y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
    game.time.events.add(2200, function(){
      this.logoVisible = true;
    }, this);
    game.time.events.loop(500, function(){
      if(this.logoVisible){
        if(this.pressKey.alpha === 0) {
          this.pressKey.alpha = 1;
        } else {
          this.pressKey.alpha = 0;
        }
      }
    }, this);
  },
  update: function() {
    var self = this;
    game.input.keyboard.onDownCallback = function(e) {
      if(!game.keyStruck){
        if(self.logoVisible){

          game.time.events.add(1000, function(){
            game.state.start(game.levels[game.currLevel]);
          }, this);
          game.keyStruck = true;
        }
      }
    }
  }
}
