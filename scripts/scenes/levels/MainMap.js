class MainMap extends Phaser.Scene {
  constructor() {
    super("MainMap");
  }



  create() {

    //var levelOneText;

    this.background = this.add.image(0, 0, "blue_print").setOrigin(0).setScale(1.1);
    this.add.text(config.width/2 - 200, config.height/14, "Start Building!!!", {
      font: "60px Arial",
      fill: "#ffffff",
      align: "center"
    });

    this.createMainMenuButton()
    this.createLevelOneButton()
    this.createLevelTwoButton()
    this.createLevelThreeButton()

  }

  createMainMenuButton() {
      var bg = this.add.image(0, 0, "main_menu_button");
      var text = this.add.text(0, 0, "");
      var container = this.add.container(15, 10, [ bg, text ]);
      container.setSize(bg.width, bg.height);
      container.setPosition(config.width/2, config.height - 50);
      container.setInteractive().on('pointerdown', () => this.updateToMainScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });

  }

  createLevelOneButton() {
    var sprite = this.add.circle(config.width/4 - 80, config.height - 140, 40, 0xfae802);
    var label = this.add.text(config.width/4 - 90, config.height - 160, "1", {
      font: "40px Arial",
      fill: "#000000",
      align: "center"
    });
    sprite.setInteractive().on('pointerdown', () => this.updateToLevelOneScene());
  }

  createLevelTwoButton() {
    var sprite = this.add.circle(config.width/2 - 110, config.height/2 + 20, 40, 0xfae802);
    var label = this.add.text(config.width/2 - 120, config.height/2, "2", {
      font: "40px Arial",
      fill: "#000000",
      align: "center"
    });
    sprite.setInteractive().on('pointerdown', () => this.updateToLevelTwoScene());
  }

  createLevelThreeButton() {
    var sprite = this.add.circle(config.width/4*3, config.height/5 + 30, 40, 0xfae802);
    var label = this.add.text(config.width/4*3 - 10, config.height/5 + 10, "3", {
      font: "40px Arial",
      fill: "#000000",
      align: "center"
    });
    sprite.setInteractive().on('pointerdown', () => this.updateToLevelThreeScene());
  }

  updateToMainScene() {
    this.scene.start("MainMenu");
  }
  updateToLevelOneScene() {
    this.scene.start("LevelOne");
  }
  updateToLevelTwoScene() {
    this.scene.start("LevelTwo");
  }
  updateToLevelThreeScene() {
    this.scene.start("LevelThree");
  }

}
