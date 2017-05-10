"use strict"; 

var CreditsState = function(game) {};

CreditsState.prototype.preload = function() {
    this.game.load.image('background', 'Assets/credits_screen.png');
    this.game.load.image('menu', 'Assets/button_home_on.png');
    this.game.load.image('sound_on', 'Assets/button_sound_on.png');
};

CreditsState.prototype.create = function() {
    this.game.add.sprite(0,0, 'background')

    this.menu = this.game.add.sprite(10, 10, 'menu')
    this.menu.scale.x = 1.1
    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    
    this.sound = this.game.add.sprite(785, 10, 'sound_on')
    this.sound.scale.x = 1.1
    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setSound, this);   
};

function gotoMenu(item) {
    this.game.state.start("menu");
};

function setSound(item) {
//    this.game.state.start("credits");
};

CreditsState.prototype.update = function() {
};
