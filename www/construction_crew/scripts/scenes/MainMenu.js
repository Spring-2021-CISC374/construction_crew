class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {

    this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(7);

    this.add.text(config.width/3, config.height/3, "Construction Crew", {
      font: "100px Arial",
      fill: "white"
    });


    //Tutorial Button
    const tutorialButton = this.add.text(config.width/3, config.height/3 + 100, 'Tutorial', {
      font: "70px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateTutorialScene());

    const startGameButton = this.add.text(config.width/3, config.height/3 + 200, 'Start Game', {
      font: "70px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateMainMapScene());

    const freePlayButton = this.add.text(config.width/3, config.height/3 + 300, 'FreePlay', {
      font: "70px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateFreePlayScene());

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


}
