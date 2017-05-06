"use strict"; 

var MenuState = function(game) {};

MenuState.prototype.preload = function() {
};

MenuState.prototype.create = function() {
    var text = game.add.text(game.world.centerX, game.world.centerY, "START", { font: "65px Arial", fill: "#ff0044", align: "center" });

    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputDown.add(down, this);


};

function down(item) {
    this.game.state.start("game");
}

MenuState.prototype.update = function() {
};
