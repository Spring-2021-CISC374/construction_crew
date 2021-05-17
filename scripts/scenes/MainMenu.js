class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }
  preload(){
    this.load.audio("noise", "assets/sounds/background_sound.mp3")
  }
  
  create() {
    this.game.sound.stopAll();
    var soundConfig ={
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.backgroundsound = this.sound.add("noise");
    this.backgroundsound.play(soundConfig);
    this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(2.23);
    this.createTutorialButton()
    this.createStartGameButton()
    this.createFreePlayButton()
    this.createVolumeButton("volumeOn")

  }
  
  createTutorialButton() {
      var bg = this.add.image(0, 0, "tutorial_button");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width/4, config.height/2 + 150);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateTutorialScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });

      container.visible = false; //this hides the button
  }

  createStartGameButton() {
      var bg = this.add.image(0, 0, "start_game_button");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width/2, config.height/2 + 100);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateMainMapScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
  }

  createFreePlayButton() {
      var bg = this.add.image(0, 0, "free_play_button");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width/4*3, config.height/2 + 150);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateFreePlayScene());

      //this doesn't entirely work yet
      this.input.on('pointerover',function(pointer){
        bg.setTint('black');
      });

      bg.on('pointerout',function(pointer){
        bg.clearTint();
      });

      container.visible = false; // this hides the button

  }

  createVolumeButton(image) {
      var soundButton = this.add.image(config.width - 80, 70, image);
      this.soundButton = soundButton;
      soundButton.scale = 0.5
      // TODO: get the following to work properly
      soundButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.controlSound());



  }

  controlSound() {
    if(this.backgroundsound.isPlaying){
      this.backgroundsound.stop();
      //this.backgroundsound.volume = 0;
      this.soundButton.destroy();
      //this.scene.update();
      this.createVolumeButton("volumeOff");
    }
    else{
      this.backgroundsound.play();
      //this.backgroundsound.volume = 0.1;
      this.soundButton.destroy();
      this.createVolumeButton("volumeOn")
    }
    // TODO: get this to work properly
    // Also get it so the image changes to be volumeOff
    
    /*if (this.background.isPlaying) {
      this.backgroundsound.stop();
      createVolumeButton("volumeOff")
    }
    else {
      this.backgroundsound.play();
      createVolumeButton("volumeOn")
    }*/
    //this.backgroundsound.stop();
  }

  updateTutorialScene() {
    this.scene.start("Tutorial");
  }
  updateMainMapScene() {
    this.scene.start("MainMap");
  }
  updateFreePlayScene() {
    this.scene.start("FreePlay");
  }
  /*
  updateCalendarScene() {
    this.scene.start("Calendar");
  }
  */


}
