"use strict"; 

var FunctionsGame = function(game) {};


FunctionsGame.prototype.preload = function() {
    this.game.load.image('bgMenu'       , 'Assets/initial_screen.png');
    this.game.load.image('start'        , 'Assets/big_button_play_on.png');
    this.game.load.image('credits'      , 'Assets/big_button_credits_on.png');       
    this.game.load.image('sound_on'     , 'Assets/button_sound_on.png');
    this.game.load.image('sound_off'    , 'Assets/button_sound_off.png');    
    this.game.load.image('bgGameCirco'  , 'Assets/background_01.png');
    this.game.load.image('bgTopCirco'   , 'Assets/topo_background.png');
    this.game.load.image('bgCabecalho'  , 'Assets/head_bazook.png');
    this.game.load.image('bgCortina'    , 'Assets/cortina.png');
	this.game.load.image('foreground'	, 'Assets/plateia.png');
	this.game.load.image('ground'		, 'Assets/ground.png');
    this.game.load.image('player'       , 'Assets/player.png'); //TODO trocar pela imagem do elefante
    //this.game.load.image('platform'     , 'Assets/wallHorizontal.png'); // TODO trocar pela imagem das girafas
    //spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
    this.game.load.spritesheet('platform', 'Assets/girafas_174x77.png', 174, 77, 9);
    this.game.load.image('cannon'       , 'Assets/cannon.png');
    this.game.load.image('cannon_base'  , 'Assets/cannon_basis.png');
       
    this.game.load.image('menu'         , 'Assets/button_home_on.png');
    this.game.load.image('pause'        , 'Assets/button_pause.png');
    this.game.load.image('play'         , 'Assets/button_play.png');
    this.game.load.image('bgGameOver'   , 'Assets/game_over_screen.png');
    this.game.load.image('restart'      , 'Assets/button_back_off.png');
    this.game.load.image('bgCredits'    , 'Assets/credits_screen.png');    
    this.game.load.image('bgSplash'     , 'Assets/splash_screen.png');
  
    
    
    this.game.load.audio('music_menu', ['assets/audio/Super Circus_01.ogg']);
    this.game.load.audio('music_game', ['assets/audio/Circus Tent_01.ogg']);
    
    game.sound.mute = false;
};

FunctionsGame.prototype.create = function() {
    this.game.state.start("splash");
};

FunctionsGame.prototype.update = function() {
};


function gotoGame(item) {
    this.game.state.start("game");
};

function gotoCredits(item) {
    this.game.state.start("credits");
};

function gotoLose(item) {
    this.game.state.start('lose');
};

function setarSound(item) {
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

function gotoMenu(item) {
    game.paused = false;
    this.game.state.start("menu");
};

function setarPause(item) {    
    if (game.paused) {
        game.paused = false;
        this.pause.loadTexture('pause');
    }
    else {
        game.paused = true;
        this.pause.loadTexture('play');
    }        
};