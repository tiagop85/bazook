"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function() {
}

GameState.prototype.create = function() {
    var text = game.add.text(game.world.centerX, game.world.centerY, "GAME ON", { font: "65px Arial", fill: "#ff0044", align: "center" });
    text.anchor.set(0.5);
}

GameState.prototype.update = function() {
}
