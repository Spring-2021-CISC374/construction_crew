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
      .on('pointerdown', () => this.updateToBuildScene());
  }

  updateToMainMapScene() {
    this.scene.start("Calendar");
  }

  updateToBuildScene() {
    const correct = true;
    const leveler = "LevelOne";
    this.scene.start("Build", {message: correct, level: leveler});
  }
}
