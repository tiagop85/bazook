"use strict"; 

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
};

LoseState.prototype.create = function() {
    this.aplausos = this.game.add.music = this.add.audio('aplausos');        
    this.aplausos.play();   

    this.game.add.sprite(0,0, 'bgGameOver')

    this.menu = this.game.add.sprite(10, 10, 'menu')
//    this.menu.scale.x = 1.1
//    this.menu.scale.y = 1.1
    this.menu.inputEnabled = true;
    this.menu.events.onInputDown.add(gotoMenu, this);
    
    this.sound = this.game.add.sprite(785, 10, game.global.sound_sprite)
//    this.sound.scale.x = 1.1
//    this.sound.scale.y = 1.1
    this.sound.inputEnabled = true;
    this.sound.events.onInputDown.add(setarSound, this);    
    
    this.restart = this.game.add.sprite(400, 418, 'restart')
//    this.restart.scale.x = 1.1
//    this.restart.scale.y = 1.1
    this.restart.inputEnabled = true;
    this.restart.events.onInputDown.add(gotoGame, this);

    this.textScore = this.game.add.text(420, 155, 0, {font: "bold 32px myfont", fill: "#fff", boundsAlignH: "center"});
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, contadorScore, this);
    this.textScore.anchor.x = 0.5;

    this.textScoreE = this.game.add.text(314, 317, game.global.max_scoreF, {font: "bold 32px myfont", fill: "#fff", boundsAlignH: "center"});
    this.textScoreE.anchor.x = 0.5;
    this.textScoreM = this.game.add.text(420, 317, game.global.max_scoreM, {font: "bold 32px myfont", fill: "#fff", boundsAlignH: "center"});
    this.textScoreM.anchor.x = 0.5;
    this.textScoreH = this.game.add.text(525, 317, game.global.max_scoreD, {font: "bold 32px myfont", fill: "#fff", boundsAlignH: "center"});
    this.textScoreH.anchor.x = 0.5;
    
    
    if (game.global.dificuldade == 'EASY' && game.global.new_record == 1){
        this.newRecord = this.game.add.sprite(283, 350, 'newRecord');
    }
    else{
        if (game.global.dificuldade == 'MEDIUM' && game.global.new_record == 1){
            this.newRecord = this.game.add.sprite(385, 350, 'newRecord');
        }
        else{
            if (game.global.dificuldade == 'HARD' && game.global.new_record == 1){
                this.newRecord = this.game.add.sprite(492, 350, 'newRecord');
            }                
        }
    }            
};

LoseState.prototype.update = function() {
};

function contadorScore() {
  if (this.textScore.text < game.global.score){
      this.textScore.text++;
      this.game.time.events.add(Phaser.Timer.SECOND * 0.05, contadorScore, this);
  }
}
