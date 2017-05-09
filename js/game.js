"use strict";

var GameState = function (game) {};

GameState.prototype.preload = function () {
    this.game.load.image('player', 'Assets/player.png');
    this.game.load.image('platform', 'Assets/wallHorizontal.png');
    this.game.load.image('cannon', 'Assets/cannon.png');
    this.game.load.image('background0','Assets/mountains-back.png');
	this.game.load.image('background1','Assets/mountains-mid1.png');
	this.game.load.image('background2','Assets/mountains-mid2.png');
};

GameState.prototype.create = function () {
//const
    this.SHOT_SPEED = 750;
    this.PLAYER_POSITION = 400;
    this.PLATFORM_SPEED = 300;
    this.CENARIO_SPEED = -400;
    
//var
    this.GAME_STATUS = 0; //| 0: not started | 1: started - launching | 2: started - stabled_x | -1: game over | 
    
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#5c82bc";
    
//Propriedades do Background
     this.mountainsBack = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('background0').height, 
        this.game.width, 
        this.game.cache.getImage('background0').height, 
        'background0'
    );
 
    this.mountainsMid1 = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('background1').height, 
        this.game.width, 
        this.game.cache.getImage('background1').height, 
        'background1'
    );
 
    this.mountainsMid2 = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('background2').height, 
        this.game.width, 
        this.game.cache.getImage('background2').height, 
        'background2'
    );

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
    
    this.cenarioItems.setAll("body.velocity.x",0);    
    
//criando player
    this.player = this.game.add.sprite(this.cannon.x, this.cannon.y, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    this.player.visible = false;
    
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
//    this.freezePlayerPos = false;
    this.textScore = this.game.add.text(400, 100, "SCORE: " + this.score, {fill: '#fff'});
    console.debug("score: " + this.score);

};

GameState.prototype.update = function () {
//    console.debug("GAME_STATUS: " + this.GAME_STATUS);    

//condicao de derrota
    if (this.player.y > 450 && this.GAME_STATUS > 0){
        this.GAME_STATUS = -1;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.cenarioItems.setAll("body.velocity.x",0);
        this.platform.body.velocity.x = 0;
        
//        var timeCheck = game.time.now;
        
        //this.game.state.start('lose');
    }

//    if ((this.GAME_STATUS == -1) && (game.time.now timeCheck >= 3)) {
//        this.game.state.start('lose');
//    }    
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//movimentação
    this.cannon.rotation = this.game.physics.arcade.angleToPointer(this.cannon);

    if (((this.shootKey.isDown || this.game.input.activePointer.isDown)) && (this.GAME_STATUS == 0)){
        this.shootCannon();
    }

    if (this.leftKey.isDown && this.GAME_STATUS != -1) {
        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
    } else if (this.rightKey.isDown && this.GAME_STATUS != -1) {
        this.platform.body.velocity.x = this.PLATFORM_SPEED;
    }
    
    
    if (this.player.x >= this.PLAYER_POSITION && this.GAME_STATUS == 1) {
        this.GAME_STATUS = 2;
        this.player.body.position.x = this.PLAYER_POSITION;
        this.cenarioItems.setAll("body.velocity.x",this.CENARIO_SPEED);
        this.platform.body.velocity.x = this.CENARIO_SPEED;
    }

    if (this.GAME_STATUS == 2) {
        //Fixing player x
        this.player.body.position.x = this.PLAYER_POSITION;
        
        //Parallax    
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
    }
};

GameState.prototype.platformCollision = function (player, platform) {
    if (this.GAME_STATUS != -1) {
        this.score++;
        this.textScore.setText("SCORE: "+this.score);
//      this.player.body.velocity.y = ;
        this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Quadratic.Out).start();
    }
};

GameState.prototype.shootCannon = function () {
  // Set the bullet position to the gun position.
    this.player.reset(this.cannon.x, this.cannon.y);
    this.player.rotation = this.cannon.rotation;
    this.player.visible = true;
    this.GAME_STATUS = 1;

    // Shoot it in the right direction
    this.player.body.velocity.x = Math.cos(this.player.rotation) * this.SHOT_SPEED;
    this.player.body.velocity.y = Math.sin(this.player.rotation) * this.SHOT_SPEED;  
};
    

