class MainMap extends Phaser.Scene {
  constructor() {
    super("MainMap");
  }

  create() {
    this.background = this.add.image(0, 0, "main_map").setOrigin(0).setScale(4);
    //this.add.text(20, 20, "Tutorial...");

    const backButton = this.add.text(config.width/3, config.height - 150, 'Main Menu', {
      font: "50px Arial",
      fill: '#000'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToMainScene());

    const levelOneButton = this.add.text(config.width/6, config.height - 150, 'Level One', {
      font: "50px Arial",
      fill: '#000'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToLevelOneScene());

    const levelTwoButton = this.add.text(config.width/6, config.height/5, 'Level Two', {
      font: "50px Arial",
      fill: '#000'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToLevelTwoScene());

    const levelThreeButton = this.add.text(config.width/2, config.height/5, 'Level Three', {
      font: "50px Arial",
      fill: '#000'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateToLevelThreeScene());
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
