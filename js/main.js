var game = new Phaser.Game(840, 480, Phaser.AUTO, 'phaser-canvas');

game.global = {
    dificuldade : '',
    score : 0,
    max_scoreF : 0,
    max_scoreM : 0,
    max_scoreD : 0,
    new_record : 0,
    SCORE_GETHARD: 0, //A CADA x pulos a velocidade aumenta
    music : 0,
    sound_sprite: 'sound_on'
}

game.state.add('functions', FunctionsGame);
game.state.add('menu', MenuState);
game.state.add('game', GameState); 
game.state.add('dificuldade', MenuDificuldade);
game.state.add('credits',CreditsState);
game.state.add('lose', LoseState); 
game.state.add('splash', SplashState);
game.state.start('functions');

