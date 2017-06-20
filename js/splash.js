"use strict"; 

var SplashState = function(game) {};


SplashState.prototype.preload = function() {
    if (game.global.music != 1 && game.global.music != -1){
        game.global.music = 1;
        game.sound.stopAll();    
        this.music_menu = this.game.add.music = this.add.audio('music_menu');        
        this.music_menu.loopFull();        
    }
};

SplashState.prototype.create = function() {
//    this.game.add.sprite(0,0, 'bgSplash')
    
    var sprite = this.game.add.sprite(0, 0, 'bgSplash');
    sprite.alpha = 0;
//    this.game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 1000, true);
//vaen = game.add.tween(sprite).to( { alpha: 1 }, 2000, "Linear", true, 0, -1);    
    var tween = this.game.add.tween(sprite).to( { alpha: 1 }, 550, "Linear", true, 0, -1);
//    this.game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    tween.yoyo(true, 1000);    
    this.game.time.events.add(Phaser.Timer.SECOND * 2, gotoMenu, this);
};

SplashState.prototype.update = function() {
};