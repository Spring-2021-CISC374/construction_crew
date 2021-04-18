class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {

    this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(2.23);
    this.createTutorialButton()
    this.createStartGameButton()
    this.createFreePlayButton()

      /*
      const calendarButton = this.add.text(config.width/3, config.height/3 + 400, 'Calendar', {
        font: "70px Arial",
        fill: '#0f0'
        })
        .setInteractive()
        .on('pointerdown', () => this.updateCalendarScene());
        */

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

      /*
      if (bg.input.pointerOver()) {
        bg.setTint('black');
      }
      else {
        bg.clearTint();
      }


      container.on('pointerover', function () {
        bg.setTint('black');
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
      */
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
