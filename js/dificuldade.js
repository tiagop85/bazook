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
    
//    this.credits = this.game.add.sprite(347, 191, 'facil')
//    this.credits.inputEnabled = true;
//    this.credits.events.onInputDown.add(gotoDificuldadeFacil, this);    
    this.facil = this.game.add.button(347+70, 191+22, 'facil',gotoDificuldadeFacil, this);
    this.facil.anchor.x = 0.5;
    this.facil.anchor.y = 0.5;
    this.facil.onInputOver.add(over_facil,{botao:this.facil}, this);
    this.facil.onInputOut.add(out_facil, {botao:this.facil}, this);
    
//    this.credits = this.game.add.sprite(347, 253, 'medio')
//    this.credits.inputEnabled = true;
//    this.credits.events.onInputDown.add(gotoDificuldadeMedio, this);     
    this.medio = this.game.add.button(347+70, 253+22, 'medio',gotoDificuldadeMedio, this);
    this.medio.anchor.x = 0.5;
    this.medio.anchor.y = 0.5;
    this.medio.onInputOver.add(over_medio,{botao:this.medio}, this);
    this.medio.onInputOut.add(out_medio, {botao:this.medio}, this);
    
//    this.credits = this.game.add.sprite(347, 315, 'dificil')
//    this.credits.inputEnabled = true;
//    this.credits.events.onInputDown.add(gotoDificuldadeDificil, this);        
    this.dificil = this.game.add.button(347+70, 315+22, 'dificil',gotoDificuldadeDificil, this);
    this.dificil.anchor.x = 0.5;
    this.dificil.anchor.y = 0.5;
    this.dificil.onInputOver.add(over_dificil,{botao:this.dificil}, this);
    this.dificil.onInputOut.add(out_dificil, {botao:this.dificil}, this);
    
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
