"use strict"; 

var SplashState = function(game) {};


SplashState.prototype.preload = function() {
};

SplashState.prototype.create = function() {
    //TODO timer 3s    
    this.game.state.start("menu");
};

SplashState.prototype.update = function() {
};
