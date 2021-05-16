class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload(){
    this.load.image("background", "assets/images/construction_tape.jpg");
    this.load.image("sunset", "assets/images/sunset_construction.jpg");
    this.load.image("main_map", "assets/images/main_map.jpg");
    this.load.image("button_tape", "assets/images/button_tape.jpg");
    this.load.image("tutorial_button", "assets/images/tutorial_button.jpg");
    this.load.image("start_game_button", "assets/images/start_game_button.jpg");
    this.load.image("free_play_button", "assets/images/free_play_button.jpg");
    this.load.image("blue_print", "assets/images/blue_print.jpg");
    this.load.image("main_menu_button", "assets/images/main_menu_button.jpg");
    this.load.image("back_to_map", "assets/images/back_to_map_button.jpg");
    this.load.image("try_again_button", "assets/images/try_again_button.jpg");
    this.load.image("begin_building", "assets/images/begin_building_button.jpg");
    this.load.image("build_button", "assets/images/build_button.jpg");

    this.load.image("concrete", "assets/images/concrete.png");
    this.load.image("electrician", "assets/images/electrician.png");
    this.load.image("farmer", "assets/images/farmer.png");
    this.load.image("painter", "assets/images/painter.png");
    this.load.image("plumber", "assets/images/plumber.png");
    this.load.image("roofer", "assets/images/roofer.png");
    this.load.image("wrong", "assets/images/wrong.png");
    this.load.image("build_background", "assets/images/build_background.png");
    this.load.image("tester", "assets/images/tester.png");
    this.load.image("storm", "assets/images/storm.png");
    this.load.image("rain", "assets/images/rain.png");
    this.load.image("speech", "assets/images/speech.png");
    this.load.image("hint", "assets/images/hint.png");
    this.load.image("boxBG", "assets/images/boxBG.png");
    this.load.image("closeButton", "assets/images/closeButton.png");

    this.load.image("volumeOn", "assets/images/volumeOn.jpg");
    this.load.image("volumeOff", "assets/images/volumeOff.png");

    this.load.spritesheet("building", "assets/spritesheets/animation_v3.png", {
      frameWidth: 400,
      frameHeight: 400
    });

    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    // 2.1 load the spritesheet
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("character", "assets/spritesheets/character.png",{
      frameWidth: 32,
      frameHeight: 32
    });

  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("MainMenu");
  }
}
