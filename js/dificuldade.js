"use strict"; 

var MenuDificuldade = function(game) {};

MenuDificuldade.prototype.preload = function() {
};

MenuDificuldade.prototype.create = function() {    
    this.game.add.sprite(0,0, 'bgGameMode')
    
//    this.play = this.game.add.sprite(340, 100, 'GameMode')
//    this.play.scale.x = 1.1
//    this.play.scale.y = 1.1
//    this.play.inputEnabled = true;
//    this.play.events.onInputDown.add(gotoGame, this);
    
//    this.credits = this.game.add.sprite(189, 240, 'Facil')
    this.credits = this.game.add.sprite(347, 221, 'Facil')
//    this.credits.scale.x = 1.1
//    this.credits.scale.y = 1.1
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(gotoDificuldadeFacil, this);    
    
//    this.credits = this.game.add.sprite(339, 240, 'Medio')
    this.credits = this.game.add.sprite(347, 268, 'Medio')
//    this.credits.scale.x = 1.1
//    this.credits.scale.y = 1.1
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(gotoDificuldadeMedio, this);     
    
//    this.credits = this.game.add.sprite(489, 240, 'Dificil')
    this.credits = this.game.add.sprite(347, 315, 'Dificil')
//    this.credits.scale.x = 1.1
//    this.credits.scale.y = 1.1
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(gotoDificuldadeDificil, this);        
    
    this.menu = this.game.add.sprite(10, 10, 'menu')
//    this.menu.scale.x = 1.1
//    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);    

    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
//    this.sound.scale.x = 1.1
//    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);    
};

MenuDificuldade.prototype.update = function() {
};
