"use strict"; 

var MenuState = function(game) {};

MenuState.prototype.preload = function() {
};

MenuState.prototype.create = function() {    
    if (game.global.music != 1 && game.global.music != -1){
        game.global.music = 1;
        game.sound.stopAll();    
        this.music_menu = this.game.add.music = this.add.audio('music_menu');        
        this.music_menu.loopFull();        
    }
    
    this.game.add.sprite(0,0, 'bgMenu')
    
//    this.crasdasdsadasdasdedits = this.game.add.sprite(220, 400, 'start')
//    this.crasdasdsadasdasdedits = this.game.add.sprite(220, 400, 'start')
    this.play = this.game.add.button(290, 422, 'start',gotoDificuldade, this);
//    var a = "start";
//    console.debug("teste: " + a);
//    this.play = this.game.add.sprite(220, 400, 'start')
//    button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
//    this.play.scale.x = 1.1
//    this.play.scale.y = 1.1
//    this.play.inputEnabled = true;
//    this.play.events.onInputDown.add(gotoDificuldade, this);
    this.play.anchor.x = 0.5;
    this.play.anchor.y = 0.5;
//    this.teste = 'start_click';
    this.play.onInputOver.add(over_start,{botao:this.play}, this);
    this.play.onInputOut.add(out_start, {botao:this.play}, this);
    
//    this.credits = this.game.add.sprite(450, 400, 'credits')
//    this.credits = this.game.add.sprite(450, 400, 'credits')
    this.credits = this.game.add.button(520, 422, 'credits',gotoCredits, this);
    this.credits.anchor.x = 0.5;
    this.credits.anchor.y = 0.5;
    this.credits.onInputOver.add(over_credits,{botao:this.credits}, this);
    this.credits.onInputOut.add(out_credits, {botao:this.credits}, this);
//    this.credits.scale.x = 1.1
//    this.credits.scale.y = 1.1
//    this.credits.inputEnabled = true;
//    this.credits.events.onInputDown.add(gotoCredits, this);    

    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
//    this.sound.scale.x = 1.1
//    this.sound.scale.y = 1.1 
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);        
};

MenuState.prototype.update = function() {
};

