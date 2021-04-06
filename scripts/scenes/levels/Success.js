class Success extends Phaser.Scene {
   
    constructor() {
        super("Success");
    }

    create() {
        this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(7);
        this.box = this.add.image(config.width/2, config.height/2, "box").setScale(1.5);
        const message = this.add.text(config.width/2-175, config.height/2-175, 'Great Job!', {
          font: "75px Arial",
          fill: '#0f0'
          });
        const score = this.add.text(config.width/2-120, config.height/2-50, 'Score: 100', {
            font: "40px Arial",
            fill: '#0f0'
            });

        const nextLevel = this.add.text(config.width/2+100, config.height - 300, 'Next Level', {
            font: "50px Arial",
            fill: '#0f0'
            })
            .setInteractive()
            .on('pointerdown', () => this.nextLevel());

        const replay = this.add.text(config.width/3, config.height - 300, 'Replay', {
            font: "50px Arial",
            fill: '#0f0'
            })
            .setInteractive()
            .on('pointerdown', () => this.replay());
        
        this.confetti = this.add.sprite(config.width/2, config.height/2, "confetti");
        
        this.anims.create({
            key: "confetti_anim",
            frames: this.anims.generateFrameNumbers("confetti"),
            framerate: 15,
            repeat: 2
        });

        this.confetti.play("confetti_anim", true);
        
    }

    replay() {
        this.scene.start("LevelOne");
    }

    nextLevel() {
        this.scene.start("LevelTwo");
    }
}

    