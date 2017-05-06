"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function() {
    this.game.load.image('player','assets/player.png');
    this.game.load.image('platform','assets/wallHorizontal.png');
}

GameState.prototype.create = function() {
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#5c82bc"
    
//criando player
    this.player = this.game.add.sprite(400,260,'player');
    this.player.anchor.setTo(0.5,0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    
    //  This makes the game world bounce-able
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1);
    
//criando plataforma
    this.platform = this.game.add.sprite(300,500,'platform');
    this.game.physics.enable(this.platform);
    this.platform.body.immovable = true;

//teclas
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    this.score = 0;
    this.textScore = this.game.add.text(400,100,"SCORE: "+this.score, {fill: '#fff'});
    console.debug("score: " + this.score);
}

GameState.prototype.update = function() {
    this.player.body.position.x = 400;
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//condicao de vitoria    
    if (this.coinCount == 0){
        this.game.state.start('win');
    }
    
//condicao de derrota
    if (this.player.y > 650){
        this.game.state.start('lose');
    }
    
//movimentação
    if (this.jumpKey.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -450;
        this.jumpSound.play();
        this.player.angle = 0;
        this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Bounce.Out).start();
    }

    if (this.leftKey.isDown) {
        this.platform.body.velocity.x = -300;
    }
    else
    if (this.rightKey.isDown) {
        this.platform.body.velocity.x = 300;
    }
    else this.platform.body.velocity.x = -400;

GameState.prototype.platformCollision = function(player, platform){
    this.score++;
    console.debug("score: " + this.score);
    this.textScore.setText("SCORE: "+this.score);
    this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Quadratic.Out).start();
}    
    
}
