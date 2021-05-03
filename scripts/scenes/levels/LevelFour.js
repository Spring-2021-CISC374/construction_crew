class LevelFour extends Phaser.Scene {
  constructor() {
    super("LevelFour");
  }

    create() {
      this.background = this.add.image(0, -650, "build_background").setOrigin(0);

      var speechBubble = this.add.image(0, 0, "speech");
      speechBubble.scale = 0.8
      var instructions = this.add.text(0, 0, "Building your way up to Level 4!\n" +
      "\nA bigger project requires a lot more people to get the job done!" +
      "\nNow, you will be able to schedule 2 subconstractors \nin the same day to complete the project!", {
        font: "35px Arial",
        fill: "black",
        align: "center"
      });
      instructions.setOrigin(0.5, .5)
      var container = this.add.container(0, 0, [ speechBubble, instructions ]);
      container.setSize(0, 0)//speechBubble.width/2, speechBubble.height);
      container.setPosition(config.width/2, config.height/2 - 150);
      /*
      const roofer = this.add.image(config.width/4*3 - 230, config.height/2 - 30, "roofer");
      roofer.scale = .3;

      const painter = this.add.image(config.width/2 + 190, config.height/2 - 110, "painter");
      painter.scale = 0.05;

      const electrician = this.add.image(config.width/4*3 - 230, config.height/2 - 30, "electrician");
      electrician.scale = 0.45;

      const plumber = this.add.image(config.width/4*3 - 190, config.height/2 - 260, "plumber");
      plumber.scale = 0.14;

      const rain = this.add.image(config.width/2 + 25, config.height/2 - 140, "rain")
      rain.scale = 0.1

      const concrete = this.add.image(config.width/4*2 - 50, config.height/2 - 240, "concrete");
      concrete.scale = 0.6;

      const farmer = this.add.image(config.width/4*2 + 180, config.height/2 - 245, "farmer");
      farmer.scale = 0.6;
      */
      //ANIMATION FOR CHARACTER

      this.character = this.add.sprite(config.width/8, config.height / 2, "character");
      this.anims.create({
        key: "char_anim",
        frames: this.anims.generateFrameNumbers("character"),
        frameRate: 4,
        repeat: -1
      });
      this.character.play("char_anim");
      this.character.scale = 5;

      this.createBackToMapButton()
      this.createBeginBuildingButton()

    }

    createBackToMapButton() {
      var bg = this.add.image(0, 0, "back_to_map");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(250, config.height - 150);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToMainMapScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
    }

    createBeginBuildingButton() {
      var bg = this.add.image(0, 0, "begin_building");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width - 250, config.height - 150);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToCalendar());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
    }

    updateToMainMapScene() {
      this.scene.start("MainMap");
    }

    updateToCalendar() {
      const correct = true;
      const leveler = "LevelFour";
      //This needs to be changed
      this.scene.start("Calendar", {contractor: ["Concrete", "Framer", "Plumber", "Roofer", "Electrician", "Painter"], blocked: [2], level: 3});
    }
  }
