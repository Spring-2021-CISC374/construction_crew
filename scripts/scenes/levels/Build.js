class Build extends Phaser.Scene {
    constructor() {
      super("Build");
    }
  
    create() {
        this.background = this.add.image(0, -650, "build_background").setOrigin(0);

        this.build = this.add.sprite(config.width / 2, config.height / 2 + 100, "building");

        this.anims.create({
            key: "build_anim",
            frames: this.anims.generateFrameNumbers("building"),
            frameRate: 2,
            repeat: 0
        });

        this.build.play("build_anim");

        const backButton = this.add.text(840, config.height - 75, 'Main Map!', {
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
  