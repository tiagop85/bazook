"use strict";

var GameState = function (game) {};

GameState.prototype.preload = function () {
    this.game.load.image('player', 'assets/player.png');
    this.game.load.image('platform', 'assets/wallHorizontal.png');
    this.game.load.image('cannon', 'assets/cannon.png');
};

GameState.prototype.create = function () {
    this.SHOT_SPEED = 750;
    this.PLAYER_POSITION = 400;
    this.PLATFORM_SPEED = 300;
    this.CENARIO_SPEED = -400;
    
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#5c82bc";

// Cenário
    this.cenarioItems = this.game.add.group();
    this.cenarioItems.enableBody = true;
    // Canhão
    this.cannon = this.cenarioItems.create(100, 400, 'cannon');
    this.cannon.scale.x = 0.2;
    this.cannon.scale.y = 0.5;
    this.cannon.anchor.x = 0.5;
    this.cannon.anchor.y = 0.5;
    this.cannon.angle = -45;
    
//criando player
    this.player = this.game.add.sprite(this.cannon.x, this.cannon.y, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    
    //  This makes the game world bounce-able
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1);
        
//criando plataforma
    this.platform = this.game.add.sprite(300, 400, 'platform');
    this.game.physics.enable(this.platform);
    this.platform.body.immovable = true;

//teclas
    this.shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    this.score = 0;
    this.freezePlayerPos = false;
    this.textScore = this.game.add.text(400, 100, "SCORE: " + this.score, {fill: '#fff'});
    console.debug("score: " + this.score);
};

GameState.prototype.update = function () {
    if (this.freezePlayerPos) {
        this.player.body.position.x = this.PLAYER_POSITION;
        this.cenarioItems.setAll("body.velocity.x",this.CENARIO_SPEED);
    }
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//condicao de derrota
    if (this.player.y > 650){
        //this.game.state.start('lose');
    }
    
//movimentação
    this.cannon.rotation = this.game.physics.arcade.angleToPointer(this.cannon);
    
    if (this.shootKey.isDown || this.game.input.activePointer.isDown) {
        this.shootCannon();
    }

    if (this.leftKey.isDown) {
        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
    } else if (this.rightKey.isDown) {
        this.platform.body.velocity.x = this.PLATFORM_SPEED;
    } else if (this.player.x >= this.PLAYER_POSITION) {
        this.freezePlayerPos = true;
        this.platform.body.velocity.x = this.CENARIO_SPEED;
    }
};

GameState.prototype.platformCollision = function (player, platform) {
    this.score++;
    this.textScore.setText("SCORE: "+this.score);
    this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Quadratic.Out).start();
};

GameState.prototype.shootCannon = function () {
  // Set the bullet position to the gun position.
    this.player.reset(this.cannon.x, this.cannon.y);
    this.player.rotation = this.cannon.rotation;

    // Shoot it in the right direction
    this.player.body.velocity.x = Math.cos(this.player.rotation) * this.SHOT_SPEED;
    this.player.body.velocity.y = Math.sin(this.player.rotation) * this.SHOT_SPEED;  
};
    

