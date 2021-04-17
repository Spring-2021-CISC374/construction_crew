class LevelOne extends Phaser.Scene {
    constructor() {
      super("Build");
    }
  
    create() {
        this.build = this.add.sprite(config.width / 2, config.height / 2, "build");

        this.anims.create({
            key: "build_anim",
            frames: this.anims.generateFrameNumbers("build"),
            frameRate: 2,
            repeat: 0
        });

        this.build.scale = 4;

        this.build.play("build_anim");
  
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
  