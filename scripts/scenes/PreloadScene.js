class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload(){
    this.load.image("background", "assets/images/construction_tape.jpg");
    this.load.image("main_map", "assets/images/main_map.jpg");
    this.load.image("button_tape", "assets/images/button_tape.jpg");
    this.load.image("tutorial_button", "assets/images/tutorial_button.jpg");
    this.load.image("start_game_button", "assets/images/start_game_button.jpg");
    this.load.image("free_play_button", "assets/images/free_play_button.jpg");
    this.load.image("blue_print", "assets/images/blue_print.jpg");
    this.load.image("main_menu_button", "assets/images/main_menu_button.jpg");

    this.load.image("concrete", "assets/images/concrete.png");
    this.load.image("electritian", "assets/images/electritian.png");
    this.load.image("framers", "assets/images/framers.png");
    this.load.image("painter", "assets/images/painter.png");
    this.load.image("plumer", "assets/images/plumer.png");
    this.load.image("roofer", "assets/images/roofer.png");
    this.load.image("wrong", "assets/images/wrong.png");
    this.load.image("build_background", "assets/images/build_background.png");

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

  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("MainMenu");
  }
}
