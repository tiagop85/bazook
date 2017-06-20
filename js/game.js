"use strict";

var GameState = function (game) {};

GameState.prototype.preload = function () {
//    this.andando = this.game.add.music = this.add.audio('andando');            
    this.tambores = this.game.add.music = this.add.audio('tambores');        
};

GameState.prototype.create = function () {

//constantes
    this.SHOT_SPEED = 750;
    this.PLAYER_GRAVITY = 1250;
    this.PLAYER_VEL_Y = -800;
    this.PLAYER_POSITION = 400;
    this.PLATFORM_SPEED = 300;
    
//variáveis
    this.GAME_STATUS = 0; //| 0: pré-partida | 1: lançando player | 2: player lançado | -1: game over | 
    
    if (game.global.music != 2 && game.global.music != -1){
        game.global.music = 2;
        game.sound.stopAll();
        this.music_game = this.game.add.music = this.add.audio('music_game');        
        this.music_game.loopFull();        
    }    
    
    game.paused = false;  

  // we need to add margin to the world, so the camera can move
  var margin = 50;
  // and set the world's bounds according to the given margin
  var x = -margin;
  var y = -margin;
  var w = game.world.width + margin * 2;
  var h = game.world.height + margin * 2;
  // it's not necessary to increase height, we do it to keep uniformity
  game.world.setBounds(x, y, w, h);
  
  // we make sure camera is at position (0,0)
  game.world.camera.position.set(0);    
    
//ativar sistema de física
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#000000";
    
//background
     this.fundoCirco = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('bgGameCirco').height, 
        this.game.width, 
        this.game.cache.getImage('bgGameCirco').height, 
        'bgGameCirco'
    );
    
    this.topCirco = this.game.add.tileSprite(0,
        65,
        //this.game.height - this.game.cache.getImage('bgTopCirco').height, 
        this.game.width, 
        this.game.cache.getImage('bgTopCirco').height, 
        'bgTopCirco'
    );
    this.cabecalho = this.game.add.sprite(0,0, 'bgCabecalho');
    this.cabecalho.scale.y = 0.8;

    this.ground = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('ground').height, 
        this.game.width, 
        this.game.cache.getImage('ground').height, 
        'ground'
    );   

//cenário
    this.cenarioItems = this.game.add.group();
    this.cenarioItems.enableBody = true;

//canhão
    this.cannon = this.cenarioItems.create(85, 417-37, 'cannon');
    this.cannon.scale.x = 0.45;
    this.cannon.scale.y = 0.45;
    this.cannon.anchor.x = 0.19;
    this.cannon.anchor.y = 0.59;
    this.cannon.angle = -45;
    this.cannon_base = this.cenarioItems.create(57, 410-37, 'cannon_base');
    this.cannon_base.scale.x = 0.45;
    this.cannon_base.scale.y = 0.45;
    
    this.cenarioItems.setAll("body.velocity.x",0); 
        
//player
    this.player = this.game.add.sprite(this.cannon.x, this.cannon.y, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = this.PLAYER_GRAVITY;
    this.player.visible = false;
    this.player.scale.x = 0.9;
    this.player.scale.y = 0.9;
    
    //This makes the game world bounce-able
    this.player.body.collideWorldBounds = false;
    this.player.body.bounce.set(1);
        
//plataforma
    
    this.girafas = this.game.add.sprite(300, 380, 'girafas');
    this.girafas.animations.add('walk');
    this.girafas.animations.play('walk', 12, true);
    this.girafas.anchor.x = 0.5;
    this.girafas.anchor.y = 0.5;
    
    this.platform = this.game.add.sprite(300, 380, 'plataforma');
    this.platform.scale.x = 0.55;
    this.platform.anchor.x = 0.5;
    this.platform.anchor.y = 0.5;
    this.game.physics.enable(this.platform);
    this.platform.body.immovable = true;
    
//plateia   
    this.plateia = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('bgPlateia').height, 
        this.game.width, 
        this.game.cache.getImage('bgPlateia').height, 
        'bgPlateia'
    );
        
    game.global.score = 0
    this.textScore = this.game.add.text(180, 10, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "right"});
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
    this.cortina.body.velocity.y = -650;

    this.tambores.loopFull();   
};

GameState.prototype.update = function () {
//condicao de derrota
    if (this.player.y > 380 && this.GAME_STATUS > 0 ){
        //setando game status 
        this.GAME_STATUS = -1;

        this.caiu_chao = this.game.add.music = this.add.audio('caiu_chao');         
        this.caiu_chao.play(); 
        
        addQuake(this.cortina);
        
        //parando os componentes da tela
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.body.gravity.y = 0;
        this.player.body.immovable = true;
        this.cenarioItems.setAll("body.velocity.x",0);
        this.girafas.animations.stop(null, true);
        this.platform.body.velocity.x = 0;
        //TODO: restart? creio que nao

        this.cortina.y = - this.cortina.height - 100;
        this.cortina.body.velocity.y = 650;        
//        
        this.game.time.events.add(Phaser.Timer.SECOND * 4, gotoLose, this);
//        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, gotoLose, this);
//        var gray = game.add.filter('Gray');
//        game.world.filters = [gray];        
    }
    
    if (this.GAME_STATUS == -1 && this.cortina.y >= 0){
        this.cortina.y = 0;
        this.cortina.body.velocity.y = 0;        
    }
    
//colisões
    this.game.physics.arcade.collide(this.player, this.platform, this.platformCollision, null, this);
    
//movimentação canhão
    this.rotacao = this.game.physics.arcade.angleToPointer(this.cannon)
    //limitando ângulo rotação
    if(this.rotacao >= -1.5 && this.rotacao <= -0.2){
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
        this.fundoCirco.tilePosition.x -= this.PLATFORM_SPEED/100;
        this.topCirco.tilePosition.x -= this.PLATFORM_SPEED/100;
        this.plateia.tilePosition.x -= this.PLATFORM_SPEED/250;
        
        //setando velocidade da plataforma
//        this.girafas.animations.play('walk', 12, true); IDLE
//        this.girafas.animations.stop(null, true);
//        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
        this.platform.x -= this.PLATFORM_SPEED/100;
    }

    if (this.player.x >= this.PLAYER_POSITION && this.GAME_STATUS == 1) {
        //setando game status 
        this.GAME_STATUS = 2;
        
        //fixando eixo X do jogador
        this.player.body.position.x = this.PLAYER_POSITION;
        
        //setando velocidade do canhão
        this.cenarioItems.setAll("body.velocity.x",-this.PLATFORM_SPEED);

        //setando velocidade da plataforma
//        this.girafas.animations.play('walk', 12, true); IDLE
//        this.girafas.animations.stop(null, true);
//        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
        this.platform.x -= this.PLATFORM_SPEED/100;
    }

//movimentação da plataforma (deixar sempre por ultimo)    
    if (this.leftKey.isDown && this.GAME_STATUS != -1) {
        this.girafas.animations.play('walk', 12, true);
//        TODO: somente tocar o som do passo se nao estiver tocando
//        if (!this.andando.playing){
//            this.andando.play();   
//        }
//        this.platform.body.velocity.x = -this.PLATFORM_SPEED;
        this.platform.x -= this.PLATFORM_SPEED/50;
    } 
    else if (this.rightKey.isDown && this.GAME_STATUS != -1) {
        this.girafas.animations.play('walk', 12, true);
//        TODO: somente tocar o som do passo se nao estiver tocando
//        if (!this.andando.playing){
//            this.andando.play();   
//        }
        if (this.GAME_STATUS == 2){
//            this.platform.body.velocity.x = this.PLATFORM_SPEED/2.5;
            if (this.PLATFORM_SPEED/40 <= 25){
                this.platform.x += this.PLATFORM_SPEED/40;
            }
            else{
                this.platform.x += 25;
            }
        }
        else{
//            this.platform.body.velocity.x = this.PLATFORM_SPEED;
            this.platform.x += this.PLATFORM_SPEED/50;
        }
    }
    else{ 
        this.girafas.animations.stop(null, true); //colocar o IDLE 
        if (this.GAME_STATUS != 2){
            this.platform.body.velocity.x = 0;
        }
    }
// Atualiza a posição das girafas de acordo com a plataforma
    this.girafas.x = this.platform.x;
    this.girafas.y = this.platform.y;
};

GameState.prototype.platformCollision = function (player, platform) {
    if (this.GAME_STATUS != -1) {         
        this.button_click = this.game.add.music = this.add.audio('pulo_mola');        
        this.button_click.play();    
        
        //TODO: contar apenas se a colisão vier de cima e 1x só mesmo q elefante role na plataforma
        game.global.score++;
        this.textScore.setText(game.global.score);
        //TODO: random speed Y
        this.player.body.velocity.y = this.PLAYER_VEL_Y;
        this.player.frame = 1;
        this.game.add.tween(this.player).to({angle:360}, 500, Phaser.Easing.Quadratic.Out).start();
        
        if (game.global.score % game.global.SCORE_GETHARD == 0 ){
            this.elefante = this.game.add.music = this.add.audio('elefante');        
            this.elefante.play();   
            this.PLATFORM_SPEED = this.PLATFORM_SPEED * 1.2;
            this.PLAYER_VEL_Y = this.PLAYER_VEL_Y * 1.1;
            this.PLAYER_GRAVITY = this.PLAYER_GRAVITY * 1.2;
            this.player.body.gravity.y = this.PLAYER_GRAVITY; 
        }
        else{
            if (game.global.score % (game.global.SCORE_GETHARD*3-2) == 0 ){
                this.aplausos = this.game.add.music = this.add.audio('aplausos');        
                this.aplausos.play();   
            }
            
        }
    }
};

GameState.prototype.shootCannon = function () {
    this.tambores.stop();   
    this.tiro_canhao = this.game.add.music = this.add.audio('tiro_canhao');        
    this.tiro_canhao.play();   
    
    this.elefante = this.game.add.music = this.add.audio('elefante');        
    this.elefante.play();   
    

    //setando game status 
    this.GAME_STATUS = 1;

    // Set the bullet position to the gun position.
    this.player.reset(this.cannon.x+30, this.cannon.y-30);
    this.player.rotation = this.cannon.rotation;
    this.player.visible = true;

    // Shoot it in the right direction
    this.player.body.velocity.x = Math.cos(this.player.rotation) * this.SHOT_SPEED;
    this.player.body.velocity.y = Math.sin(this.player.rotation) * this.SHOT_SPEED;  
};

function addQuake(cortina) {
  var gray = game.add.filter('Gray');
  game.world.filters = [gray];        
  
  // define the camera offset for the quake
  var rumbleOffset = 10;
  
  // we need to move according to the camera's current position
  var properties = {
    x: game.camera.x - rumbleOffset
  };
  
  // we make it a relly fast movement
  var duration = 40;
  // because it will repeat
  var repeat = 1;
  // we use bounce in-out to soften it a little bit
  var ease = Phaser.Easing.Bounce.InOut;
  var autoStart = false;
  // a little delay because we will run it indefinitely
  var delay = 0;
  // we want to go back to the original position
  var yoyo = true;
 
  var quake = game.add.tween(game.camera).to(properties, duration, ease, autoStart, delay, repeat, yoyo);
  
  // we're using this line for the example to run indefinitely
  quake.onComplete.addOnce(removeGray,{cortina: cortina});
  
  // let the earthquake begins
  quake.start();
}

function removeGray(cortina) {
  game.world.filters = null;        
}
