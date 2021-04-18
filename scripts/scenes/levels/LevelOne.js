class LevelOne extends Phaser.Scene {
  constructor() {
    super("LevelOne");
  }

  create() {
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
      .on('pointerdown', () => this.updateBuildScene());
  }

  updateToMainMapScene() {
    this.scene.start("MainMap");
  }

  updateBuildScene() {
    this.scene.start("Build");
  }
}
