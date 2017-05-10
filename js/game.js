"use strict";

var GameState = function (game) {};

GameState.prototype.preload = function () {
    this.game.load.image('player', 'Assets/player.png'); //TODO trocar pela imagem do elefante
    //spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
    //this.game.load.spritesheet('platform', 'Assets/girafa_sprites.png',);
    this.game.load.image('platform', 'Assets/wallHorizontal.png'); // TODO trocar pela imagem das girafas
    this.game.load.image('cannon', 'Assets/cannon.png');
    this.game.load.image('cannon_base', 'Assets/cannon_basis.png');
    this.game.load.image('background0','Assets/mountains-back.png'); //TODO: trocar background pelo background_01
	this.game.load.image('background1','Assets/mountains-mid1.png');
	this.game.load.image('background2','Assets/mountains-mid2.png'); //TODO: trocar background pelo parallax

    this.game.load.image('score','Assets/score.png');
    this.game.load.image('pause', 'Assets/button_pause.png');
    this.game.load.image('sound_on', 'Assets/button_sound_on.png');
};

GameState.prototype.create = function () {
//constantes
    this.SHOT_SPEED = 750;
    this.PLAYER_POSITION = 400;
    this.PLATFORM_SPEED = 300;
    this.CENARIO_SPEED = -400;
    
//variáveis
    this.GAME_STATUS = 0; //| 0: pré-partida | 1: lançando player | 2: player lançado | -1: game over | 
    
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#5c82bc";
    
//background
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

//cenário
    this.cenarioItems = this.game.add.group();
    this.cenarioItems.enableBody = true;

//canhão
    //TODO: fixar ponto de giro na base do canhão, pois o movimento ta estranho
    this.cannon = this.cenarioItems.create(100, 400, 'cannon');
    this.cannon.scale.x = 0.45;
    this.cannon.scale.y = 0.45;
    this.cannon.anchor.x = 0.5;
    this.cannon.anchor.y = 0.5;
    this.cannon.angle = -45;
    this.cannon_base = this.cenarioItems.create(57, 410, 'cannon_base');
    this.cannon_base.scale.x = 0.45;
    this.cannon_base.scale.y = 0.45;
    
    this.cenarioItems.setAll("body.velocity.x",0);    
    
//player
    this.player = this.game.add.sprite(this.cannon.x, this.cannon.y, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    this.player.visible = false;
    
    //This makes the game world bounce-able
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(1);
        
//plataforma
    this.platform = this.game.add.sprite(300, 400, 'platform');
    this.game.physics.enable(this.platform);
    this.platform.body.immovable = true;
    
//score
    this.scorebg = this.game.add.sprite(10,10,'score')
    this.scorebg.scale.x = 0.8
    this.scorebg.scale.y = 0.8
    
    game.global.score = 0
    this.textScore = this.game.add.text(110, 40, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "right"});
   
//TODO: ao clicar nos botoes de HUD, o canhao esta disparando tbm    
    
//sound
    this.sound = this.game.add.sprite(785, 10, 'sound_on')
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setSound, this);        

//pause
    this.pause = this.game.add.sprite(735, 10, 'pause')
    this.pause.scale.x = 1.1
    this.pause.scale.y = 1.1
    this.pause.inputEnabled = true;
    this.pause.events.onInputDown.add(setPause, this);        

//teclas
    this.shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

//    console.debug("score: " + this.score);
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
        //TODO: restart        
//        var timeCheck = game.time.now;
        
        this.game.state.start('lose');
    }

//    if ((this.GAME_STATUS == -1) && (game.time.now timeCheck >= 3)) {
//        this.game.state.start('lose');
//    }    
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//movimentação canhão
    this.rotacao = this.game.physics.arcade.angleToPointer(this.cannon)
    //limitando ângulo rotação
    if(this.rotacao >= -1.5 && this.rotacao <= -0.2){
        this.cannon.rotation = this.rotacao;
    }
    
    if (((this.shootKey.isDown || this.game.input.activePointer.isDown)) && (this.GAME_STATUS == 0)){
        //lançar jogador
        this.shootCannon();
    }

    if (this.GAME_STATUS == 2) {
        //fixando eixo X do jogador
        this.player.body.position.x = this.PLAYER_POSITION;
        
        //parallax
        //TODO: trocar por velocidade no eixo X
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
        
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
        
};

GameState.prototype.platformCollision = function (player, platform) {
    if (this.GAME_STATUS != -1) {        
        //TODO: contar apenas se a colisão vier de cima e 1x só mesmo q elefante role na plataforma
        game.global.score++;
        this.textScore.setText(game.global.score);
        //TODO: random speed Y
        //this.player.body.velocity.y = ;
        this.game.add.tween(this.player).to({angle:360}, 750, Phaser.Easing.Quadratic.Out).start();
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
    
function setSound(item) {
//    this.game.state.start("credits");
};

function setPause(item) {
//    this.game.state.start("credits");
};