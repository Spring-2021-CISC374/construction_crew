class LevelOne extends Phaser.Scene {
  constructor() {
    super("LevelOne");
  }

  create() {
    this.background = this.add.image(0, -650, "build_background").setOrigin(0);

    const menuButton = this.add.text(config.width/3, config.height/3 + 100, 'Menu', {
      font: "70px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToMainMapScene());

    const buildButton = this.add.text(config.width/3, config.height/3 + 200, 'Build', {
      font: "70px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToBuildScene());
    this.add.text(config.width/3, 50, "Welcome to Level One!", {
      font: "60px Arial",
      fill: "black",
      align: "center"
    });

    this.add.text(config.width/4, 120, "To construct your building, schedule the following subcontractors in the proper order into the calendar!", {
      font: "20px Arial",
      fill: "black",
      align: "center"
    });

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
    this.scene.start("Calendar");
  }

  updateToCalendar() {
    const correct = true;
    const leveler = "LevelOne";
    this.scene.start("Calendar", {message: correct, level: leveler});
  }
}
