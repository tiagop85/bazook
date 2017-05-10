"use strict"; 

var MenuState = function(game) {};

MenuState.prototype.preload = function() {
    this.game.load.image('background', 'Assets/initial_screen.png');
    this.game.load.image('play', 'Assets/big_button_play_on.png');
    this.game.load.image('credits', 'Assets/big_button_credits_on.png');    
    this.game.load.image('sound_on', 'Assets/button_sound_on.png');
};

MenuState.prototype.create = function() {
    this.game.add.sprite(0,0, 'background')
    
    this.play = this.game.add.sprite(220, 400, 'play')
    this.play.scale.x = 1.1
    this.play.scale.y = 1.1
    this.play.inputEnabled = true;
    this.play.events.onInputDown.add(gotoGame, this);
    
    this.credits = this.game.add.sprite(450, 400, 'credits')
    this.credits.scale.x = 1.1
    this.credits.scale.y = 1.1
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(gotoCredits, this);    

    this.sound = this.game.add.sprite(785, 10, 'sound_on')
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setSound, this);    
};

function gotoGame(item) {
    this.game.state.start("game");
};

function gotoCredits(item) {
    this.game.state.start("credits");
};

function setSound(item) {
//    this.game.state.start("credits");
};

MenuState.prototype.update = function() {
};
