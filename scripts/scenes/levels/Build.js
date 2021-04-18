class Build extends Phaser.Scene {
    constructor() {
      super("Build");
    }

    init (data){
        this.correct = data.message;
        this.level = data.level;
    }
  
    create() {
        this.background = this.add.image(0, -650, "build_background").setOrigin(0);

        const correct = this.correct;

        var style = { font: "50px Arial", fill: "black", boundsAlignH: "center", boundsAlignV: "middle"};

        if(correct){
            this.build = this.add.sprite(config.width / 3, config.height / 2, "building");
            this.anims.create({
                key: "build_anim",
                frames: this.anims.generateFrameNumbers("building"),
                frameRate: 2,
                repeat: 0
            });
            this.build.play("build_anim");
            this.build.scale = 1.5;

            const message = this.add.text(config.width - 700, config.height / 2 - 100, 'Congradulations!\nYou did it!', style);

            const backButton = this.add.text(config.width - 700, config.height / 2 + 100, 'Main Map!', style)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateToMainScene());

        }else{

            this.wrong = this.add.image(config.width / 3, config.height / 2, "wrong");

            const message = this.add.text(config.width - 700, config.height / 2 - 100, 'Incorrect!\nPlease try again!\n', style);

            const backButton = this.add.text(config.width - 700, config.height / 2 + 100, 'Try Again', style)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.updateScene());
        }
        
    }
  
    updateToMainScene() {
        this.scene.start("MainMap");
    }

    updateScene(){
        const lev = this.level;
        this.scene.start(lev);
    }

    
}
  