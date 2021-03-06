Robot.createLewikula = function(game,x,y,pickups,explos){
  var lewikula = game.add.sprite(x, y, 'lewikula');
  lewikula.animations.add('lewikulaAnim', [0,1,2,3,4,5,6,7], 10, true);
  game.physics.arcade.enable(lewikula);
  lewikula.body.setSize(42, 42, 28, 26);
  lewikula.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
  lewikula.body.bounce.x = 1;
  lewikula.pointValue = 5;

  lewikula.HP = 20;

  lewikula.animations.play('lewikulaAnim');

  lewikula.update = function(){
    if(this.HP <= 0){
      if(this.alive){
        explos.push(Robot.createExplosion(this.x+this.height*0.5,this.y+this.width*0.5));
        pickups.push(Robot.createTreasure(game, this.x, this.y));
        this.x = -100;
        this.y = -100
        Robot.points += this.pointValue;
      }
      this.destroy();
    }
  }

  return lewikula;
}
