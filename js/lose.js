"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
};

LoseState.prototype.create = function() {
    var text = game.add.text(game.world.centerX, game.world.centerY, "YOU LOSE!", { font: "65px Arial", fill: "#ff0044", align: "center" });
    text.anchor.set(0.5);
    
    var restart = game.add.text(game.world.centerX, game.world.centerY, "RESTART", { font: "35px Arial", fill: "#ff0044", align: "center" });

    restart.anchor.set(0.5);
    restart.inputEnabled = true;
    restart.events.onInputDown.add(down, this);
    restart.y = 350;
};

function down(item) {
    this.game.state.start("game");
}


LoseState.prototype.update = function() {
};
