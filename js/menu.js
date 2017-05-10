"use strict"; 

var MenuState = function(game) {};

MenuState.prototype.preload = function() {
};

MenuState.prototype.create = function() {
    game.sound.mute = false;
    console.debug("game.global.music: " + game.global.music);
    if (game.global.music != 1){
        game.global.music = 1;
        console.debug("game.global.music: " + game.global.music);
        var music
        music = game.add.audio('music_menu');
//        this.music.stop();
        music.loopFull();        
        music.volume = 100;
    }
    
    this.game.add.sprite(0,0, 'bgMenu')
    
    this.play = this.game.add.sprite(220, 400, 'start')
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
    this.sound.events.onInputDown.add(setarSound, this);    
};

MenuState.prototype.update = function() {
};
