"use strict"; 

var FunctionsGame = function(game) {};


FunctionsGame.prototype.preload = function() {
    this.game.load.image('bgMenu'       , 'Assets/initial_screen.png');
    this.game.load.image('start'        , 'Assets/big_button_play_on.png');
    this.game.load.image('start_click'  , 'Assets/big_button_play_off.png');
    this.game.load.image('credits'      , 'Assets/big_button_credits_on.png');       
    this.game.load.image('credits_click', 'Assets/big_button_credits_off.png');       
    this.game.load.image('sound_on'     , 'Assets/button_sound_on.png');
    this.game.load.image('sound_off'    , 'Assets/button_sound_off.png');    
    this.game.load.image('bgGameCirco'  , 'Assets/background_01.png');
    this.game.load.image('bgTopCirco'   , 'Assets/topo_background.png');
    this.game.load.image('bgCabecalho'  , 'Assets/head_bazook.png');
    this.game.load.image('bgCortina'    , 'Assets/cortina.png');
	this.game.load.image('bgPlateia'	, 'Assets/plateia.png');
	this.game.load.image('ground'		, 'Assets/ground.png');
    this.game.load.spritesheet('player' , 'Assets/elefantes_99x85.png', 99, 85, 2);
    this.game.load.spritesheet('girafas', 'Assets/girafas_174x77.png', 174, 77, 9);
    this.game.load.image('plataforma'	, 'Assets/invisible_platform.png');
    this.game.load.image('cannon'       , 'Assets/cannon.png');
    this.game.load.image('cannon_base'  , 'Assets/cannon_basis.png');
       
    this.game.load.image('menu'         , 'Assets/button_home_on.png');
    this.game.load.image('pause'        , 'Assets/button_pause.png');
    this.game.load.image('play'         , 'Assets/button_play.png');
    this.game.load.image('bgGameOver'   , 'Assets/game_over_screen.png');
    this.game.load.image('restart'      , 'Assets/button_back_on.png');
    this.game.load.image('bgCredits'    , 'Assets/credits_screen.png');    
    this.game.load.image('bgSplash'     , 'Assets/splash_screen.png');
    this.game.load.image('bgGameMode'   , 'Assets/game_mode_screen.png');
    this.game.load.image('bgPauseSreen' , 'Assets/pause_screen.png');
    
    this.game.load.image('GameMode'     , 'Assets/big_button_game_mode_on.png');
    this.game.load.image('facil'        , 'Assets/big_button_easy_on.png');
    this.game.load.image('facil_click'  , 'Assets/big_button_easy_off.png');
    this.game.load.image('medio'        , 'Assets/big_button_medium_on.png');
    this.game.load.image('medio_click'  , 'Assets/big_button_medium_off.png');
    this.game.load.image('dificil'      , 'Assets/big_button_hard_on.png');
    this.game.load.image('dificil_click', 'Assets/big_button_hard_off.png');
    this.game.load.image('SpeedUp'      , 'Assets/speed_up.png');
    this.game.load.image('newRecord'    , 'Assets/new_high_score.png');
  
    this.game.load.script('gray'        , 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Gray.js');    
    this.game.load.script('BlurX'       , 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js');
    this.game.load.script('BlurY'       , 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js');    
    
    this.game.load.audio('music_menu'   , ['assets/audio/Super Circus_01.ogg']);
    this.game.load.audio('music_game'   , ['assets/audio/Circus Tent_01.ogg']);
    
    this.game.load.audio('button_click' , ['assets/audio/Button-SoundBible.com-1420500901_01.ogg']);
    this.game.load.audio('button_switch', ['assets/audio/Switch-SoundBible.com-350629905_01.ogg']);
    this.game.load.audio('pulo_mola'    , ['assets/audio/zapsplat_caroon_plastic_twang_01.ogg']);    
    this.game.load.audio('caiu_chao'    , ['assets/audio/PUNCH_01.ogg']);    
//    this.game.load.audio('andando'    , ['assets/audio/268758__deleted-user-5093904__footsteps_01.ogg']);    
    this.game.load.audio('tiro_canhao'  , ['assets/audio/370219__eflexthesounddesigner__cannon-shot-sci-fi-mixed_01.ogg']);    
    this.game.load.audio('tambores'     , ['assets/audio/Drum Roll-SoundBible.com-1599301580_01.ogg']);    
    this.game.load.audio('elefante'     , ['assets/audio/139052__jasher70__elephant-scream_01.ogg']);    
    this.game.load.audio('aplausos'     , ['assets/audio/51743__erkanozan__applause_01.ogg']);    
    
    this.game.load.bitmapFont('myfont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');        
/*
    this.aplausos = this.game.add.music = this.add.audio('aplausos');        
    this.aplausos.play();   
*/    
    game.sound.mute = false;
};

FunctionsGame.prototype.create = function() {
    this.game.state.start("splash");
};

FunctionsGame.prototype.update = function() {
};


function gotoDificuldade(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    
//    this.play.loadTexture('start');
    
//    botao.scale.x = 1;
//    botao.scale.y = 1;

    
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startDificuldade, this);
};

function startDificuldade() {
    this.game.state.start("dificuldade");
};

function gotoDificuldadeFacil(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    game.global.dificuldade = 'EASY';
    game.global.SCORE_GETHARD = 10;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startGame, this);
};

function gotoDificuldadeMedio(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    game.global.dificuldade = 'MEDIUM';
    game.global.SCORE_GETHARD = 7;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startGame, this);
};

function gotoDificuldadeDificil(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    game.global.dificuldade = 'HARD';
    game.global.SCORE_GETHARD = 5;
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startGame, this);
};

function gotoGame(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startGame, this);
};

function startGame() {
    game.global.new_record = 0;
    this.game.state.start("game");
};

function gotoCredits(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');        
    this.button_click.play();    
    this.game.state.start("credits");
};

function gotoLose(item) {
    this.game.state.start('lose');
};


function gotoMenu(item) {
    this.button_click = this.game.add.music = this.add.audio('button_click');
    if (this.game.state.current !== "splash") this.button_click.play();     
    game.paused = false;
    if (this.game.state.current == "game") this.tambores.stop();    
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startMenu, this);
};

function startMenu() {
    this.game.state.start("menu");
};

function setarSound(item) {
    this.button_switch = this.game.add.music = this.add.audio('button_switch');        
    this.button_switch.play();
    if (game.sound.mute) {
        game.sound.mute = false;
        game.global.sound_sprite = 'sound_on';
        this.sound.loadTexture('sound_on');
    }
    else {
        game.sound.mute = true;
        game.global.sound_sprite = 'sound_off';
        this.sound.loadTexture('sound_off');
    }    
};

function setarPause(item) {
    if (this.GAME_STATUS != -1){    
        this.button_switch = this.game.add.music = this.add.audio('button_switch');        
        this.button_switch.play();
        if (game.paused) {
            game.world.filters = null;
            game.paused = false;
            this.pause.loadTexture('pause');
            
            game.time.events.add(0, function() {
                game.add.tween(this.bg_pause).to({alpha: 0}, 10, Phaser.Easing.Linear.None, true);
            }, this);              
            
        }
        else {
//            var blurX = game.add.filter('BlurX');
//	       var blurY = game.add.filter('BlurY');
//
//            blurX.blur = 6;
//            blurY.blur = 6;
//
//            game.world.filters = [blurX, blurY];
            
//            this.bg_pause = this.game.add.sprite(0,0, 'bgPauseSreen');
//            this.bg_pausesprite.alpha = 0;
                
            game.time.events.add(0, function() {
                game.add.tween(this.bg_pause).to({alpha: 1}, 10, Phaser.Easing.Linear.None, true);
            }, this);              

            this.game.time.events.add(Phaser.Timer.SECOND * 0.2, startPause, this);
            
            
        }        
    }
};

function startPause() {
    this.pause.loadTexture('play');
    game.paused = true;
};

function over_start(botao) {
//    asseta = asseta.toString();
//    console.debug("asset: " + asseta);
botao.loadTexture('start_click'); 
//this.play.loadTexture('start_click'); 
//    asd.anchor.x = 0.5;
//    asd.anchor.y = 0.5;    
//    asd.x = 220+asd.width/2;
//    asd.y = 400+asd.height/2;
    botao.scale.x = 1.2;
    botao.scale.y = 1.2;
}

function out_start(botao) {
//    console.debug("asset: " + asseta);
botao.loadTexture('start'); 
//this.loadTexture('start'); 
//this.play.loadTexture('start'); 
//    asd.x = 220+asd.width/2;
//    asd.y = 400+asd.height/2;
    botao.scale.x = 1;
    botao.scale.y = 1;
    
}

function over_credits(botao) {
    botao.loadTexture('credits_click'); 
    botao.scale.x = 1.2;
    botao.scale.y = 1.2;
}

function out_credits(botao) {
    botao.loadTexture('credits'); 
    botao.scale.x = 1;
    botao.scale.y = 1;    
}


function over_facil(botao) {
    botao.loadTexture('facil_click'); 
    botao.scale.x = 1.2;
    botao.scale.y = 1.2;
}

function out_facil(botao) {
    botao.loadTexture('facil'); 
    botao.scale.x = 1;
    botao.scale.y = 1;    
}

function over_medio(botao) {
    botao.loadTexture('medio_click'); 
    botao.scale.x = 1.2;
    botao.scale.y = 1.2;
}

function out_medio(botao) {
    botao.loadTexture('medio');
    botao.scale.x = 1;
    botao.scale.y = 1;    
}

function over_dificil(botao) {
    botao.loadTexture('dificil_click'); 
    botao.scale.x = 1.2;
    botao.scale.y = 1.2;
}

function out_dificil(botao) {
    botao.loadTexture('dificil');
    botao.scale.x = 1;
    botao.scale.y = 1;    
}