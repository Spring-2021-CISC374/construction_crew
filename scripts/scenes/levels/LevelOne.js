class LevelOne extends Phaser.Scene {
  constructor() {
    super("LevelOne");
  }

  create() {
    //this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(7);
    //this.add.text(20, 20, "Tutorial...");


    const backButton = this.add.text(config.width/3, config.height - 150, 'Main Map!', {
      font: "50px Arial",
      fill: '#0f0'
      })
      .setInteractive()
      .on('pointerdown', () => this.updateScene());
  }

  updateScene() {
    this.scene.start("MainMap");
  }
}
