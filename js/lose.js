"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
    this.game.load.image('background', 'Assets/game_over_screen.png');
    this.game.load.image('restart', 'Assets/button_back_off.png');
    this.game.load.image('menu', 'Assets/button_home_off.png');
    this.game.load.image('score','Assets/score.png');
};

LoseState.prototype.create = function() {
    this.game.add.sprite(0,0, 'background')

    this.restart = this.game.add.sprite(300, 330, 'restart')
    this.restart.scale.x = 1.1
    this.restart.scale.y = 1.1
    this.restart.inputEnabled = true;
    this.restart.events.onInputDown.add(gotoGame, this);

    this.menu = this.game.add.sprite(490, 330, 'menu')
    this.menu.scale.x = 1.1
    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    
    this.scorebg = this.game.add.sprite(340,260,'score')
    this.scorebg.scale.x = 0.8
    this.scorebg.scale.y = 0.8
    this.textScore = this.game.add.text(440, 290, game.global.score, {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "right"});    
};

function gotoGame(item) {
    this.game.state.start("game");
};

function gotoMenu(item) {
    this.game.state.start("menu");
};

LoseState.prototype.update = function() {
};
