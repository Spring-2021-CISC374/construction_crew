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

    this.createButton(config.width/4 - 80, config.height - 140, config.width/4 - 90, config.height - 160, "1", "LevelOne")
    this.createButton(config.width/2 - 110, config.height/2 + 20, config.width/2 - 120, config.height/2, "2", "LevelTwo")
    this.createButton(config.width/4*3, config.height/5 + 30, config.width/4*3 - 10, config.height/5 + 10, "3", "LevelThree")
    this.createButton(config.width/4*3 + 60, config.height - 200, config.width/4*3+50, config.height - 220, "4", "LevelFour")
    this.createButton(config.width/2 + 100, config.height/2 + 50, config.width/2 + 90, config.height/2 + 30, "5", "LevelFive")
    this.createButton(config.width/4 + 200, config.height/5, config.width/4 + 190, config.height/5 - 20, "6", "LevelSix")
    this.createButton(config.width/2 - 120, config.height - 200, config.width/2 - 130, config.height - 220, "7", "LevelSeven")

  }

  createMainMenuButton() {
      var bg = this.add.image(0, 0, "main_menu_button");
      var text = this.add.text(0, 0, "");
      var container = this.add.container(15, 10, [ bg, text ]);
      container.setSize(bg.width, bg.height);
      container.setPosition(config.width/2, config.height - 50);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToMainScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });

  }

  createButton(spriteX, spriteY, labelX, labelY, levelNum, scene) {
    var sprite = this.add.circle(spriteX, spriteY, 40, 0xfae802);
    var label = this.add.text(labelX, labelY, levelNum, {
      font: "40px Arial",
      fill: "#000000",
      align: "center"
    });
    sprite.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToScene(scene));

  }

  updateToScene(scene) {
    this.scene.start(scene);
  }

}
