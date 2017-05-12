"use strict";

var GameState = function (game) {};

GameState.prototype.preload = function () {
    
};

GameState.prototype.create = function () {
//constantes
    this.SHOT_SPEED = 750;
    this.PLAYER_GRAVITY = 1250;
    this.PLAYER_VEL_Y = -800;
    this.PLAYER_POSITION = 400;
    this.PLATFORM_SPEED = 300;
    this.CENARIO_SPEED = -400;
    
//variáveis
    this.GAME_STATUS = 0; //| 0: pré-partida | 1: lançando player | 2: player lançado | -1: game over | 
    
    if (game.global.music != 2){
        game.global.music = 2;
        game.sound.stopAll();
        this.music_game = this.game.add.music = this.add.audio('music_game');        
        this.music_game.loopFull();        
        this.music_game.volume = 100;   
    }    
    
    game.paused = false;  
    
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#5c82bc";
    
//background
     this.mountainsBack = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('bgGameCirco').height, 
        this.game.width, 
        this.game.cache.getImage('bgGameCirco').height, 
        'bgGameCirco'
    );
    
    this.cabecalho = this.game.add.sprite(0,0, 'bgCabecalho');
    this.cabecalho.scale.y = 0.7;
    
    this.mountainsBack = this.game.add.tileSprite(0,
        this.cabecalho.height,
        //this.game.height - this.game.cache.getImage('bgTopCirco').height, 
        this.game.width, 
        this.game.cache.getImage('bgTopCirco').height, 
        'bgTopCirco'
    );
    this.groundParallax = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('ground').height, 
        this.game.width, 
        this.game.cache.getImage('ground').height, 
        'ground'
    );   

//cenário
    this.cenarioItems = this.game.add.group();
    this.cenarioItems.enableBody = true;

//canhão
    this.cannon = this.cenarioItems.create(85, 417, 'cannon');
    this.cannon.scale.x = 0.45;
    this.cannon.scale.y = 0.45;
    this.cannon.anchor.x = 0.19;
    this.cannon.anchor.y = 0.59;
    this.cannon.angle = -45;
    this.cannon_base = this.cenarioItems.create(57, 410, 'cannon_base');
    this.cannon_base.scale.x = 0.45;
    this.cannon_base.scale.y = 0.45;
    
    this.cenarioItems.setAll("body.velocity.x",0); 
        
//player
    this.player = this.game.add.sprite(this.cannon.x, this.cannon.y, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = this.PLAYER_GRAVITY;
    this.player.visible = false;
    
    //This makes the game world bounce-able
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1);
        
//plataforma
    this.platform = this.game.add.sprite(300, 350, 'platform');
    this.platform.animations.add('walk');
    this.platform.animations.play('walk', 12, true);
    this.game.physics.enable(this.platform);
    this.platform.body.immovable = true;
    
//Foreground plateia   
    this.foreground = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('foreground').height, 
        this.game.width, 
        this.game.cache.getImage('foreground').height, 
        'foreground'
    );
        
    game.global.score = 0
    this.textScore = this.game.add.text(160, 12, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "right"});
    this.textScore.anchor.x = 0.5;    
   
    this.menu = this.game.add.sprite(10, 10, 'menu')
    this.menu.scale.x = 1.1
    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);

//sound
    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);        

//pause
    this.pause = this.game.add.sprite(735, 10, 'pause')
    this.pause.scale.x = 1.1
    this.pause.scale.y = 1.1
    this.pause.inputEnabled = true;
    this.pause.events.onInputDown.add(setarPause, this);        

//teclas
    this.shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

//    console.debug("score: " + this.score);
    
    this.cortina = this.game.add.sprite(0,0, 'bgCortina');
    this.game.physics.enable(this.cortina);
    this.cortina.body.velocity.y = -400;
};

GameState.prototype.update = function () {
//condicao de derrota
    if (this.player.y > 450 && this.GAME_STATUS > 0){
        //setando game status 
        this.GAME_STATUS = -1;
        //parando os componentes da tela
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.cenarioItems.setAll("body.velocity.x",0);
        this.platform.body.velocity.x = 0;
        //TODO: restart? creio que nao                    
        this.game.time.events.add(Phaser.Timer.SECOND * 2, gotoLose, this);
    }
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//movimentação canhão
    this.rotacao = this.game.physics.arcade.angleToPointer(this.cannon)
    //limitando ângulo rotação
    if(this.rotacao >= -1.5 && this.rotacao <= -0.35){
        this.cannon.rotation = this.rotacao;
    }
    
    if (((this.shootKey.isDown || this.game.input.activePointer.isDown)) && (this.GAME_STATUS == 0) && (game.input.mousePointer.y > 55)){
        //lançar jogador
        this.shootCannon();
    }

    if (this.GAME_STATUS == 2) {
        //fixando eixo X do jogador
        this.player.body.position.x = this.PLAYER_POSITION;
        
        //parallax
        //TODO: trocar por velocidade no eixo X
        this.mountainsBack.tilePosition.x -= 0.3;
        this.foreground.tilePosition.x -= 1;
        
        //setando velocidade da plataforma
        this.platform.body.velocity.x = this.CENARIO_SPEED;
    }

    if (this.player.x >= this.PLAYER_POSITION && this.GAME_STATUS == 1) {
        //setando game status 
        this.GAME_STATUS = 2;
        
        //fixando eixo X do jogador
        this.player.body.position.x = this.PLAYER_POSITION;
        
        //setando velocidade do canhão
        this.cenarioItems.setAll("body.velocity.x",this.CENARIO_SPEED);

        //setando velocidade da plataforma
        this.platform.body.velocity.x = this.CENARIO_SPEED;
    }

//movimentação da plataforma (deixar sempre por ultimo)    
    if (this.leftKey.isDown && this.GAME_STATUS != -1) {
        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
    } 
    else if (this.rightKey.isDown && this.GAME_STATUS != -1) {
        this.platform.body.velocity.x = this.PLATFORM_SPEED;
    }
    else if (this.GAME_STATUS != 2){
        this.platform.body.velocity.x = 0;
    }        
};

GameState.prototype.platformCollision = function (player, platform) {
    if (this.GAME_STATUS != -1) {        
        //TODO: contar apenas se a colisão vier de cima e 1x só mesmo q elefante role na plataforma
        game.global.score++;
        this.textScore.setText(game.global.score);
        //TODO: random speed Y
        this.player.body.velocity.y = this.PLAYER_VEL_Y;
        this.game.add.tween(this.player).to({angle:360}, 500, Phaser.Easing.Quadratic.Out).start();
    }
};

GameState.prototype.shootCannon = function () {
    //setando game status 
    this.GAME_STATUS = 1;

    // Set the bullet position to the gun position.
    this.player.reset(this.cannon.x, this.cannon.y);
    this.player.rotation = this.cannon.rotation;
    this.player.visible = true;

    // Shoot it in the right direction
    this.player.body.velocity.x = Math.cos(this.player.rotation) * this.SHOT_SPEED;
    this.player.body.velocity.y = Math.sin(this.player.rotation) * this.SHOT_SPEED;  
};