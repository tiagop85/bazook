var game = new Phaser.Game(840, 480, Phaser.AUTO, 'phaser-canvas');

game.global = {
 score : 0,
 sound : true
}

game.state.add('menu', MenuState);
game.state.add('game', GameState);
game.state.add('credits',CreditsState);
game.state.add('lose', LoseState);
game.state.start('menu');