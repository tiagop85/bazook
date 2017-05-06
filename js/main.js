var game = new Phaser.Game(840, 480, Phaser.AUTO, 'phaser-canvas');

game.state.add('menu', MenuState);
game.state.add('game', GameState);
game.state.add('lose', LoseState);
game.state.start('menu');