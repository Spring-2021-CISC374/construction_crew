class Build extends Phaser.Scene {
    constructor() {
      super("Build");
    }

    init (data){
        this.correct = data.message;
        this.level = data.level;
        this.score = data.score;
        this.hint = data.hint;
    }
    preload(){
      this.load.audio("drillNoises", "assets/sounds/drills.mp3")
    }

    create() {
        this.background = this.add.image(0, -650, "build_background").setOrigin(0);

        const correct = this.correct;
        var score = this.score;
        var hint = this.hint;

        var style = { font: "50px Arial", fill: "black", align: "center"};

        if(correct){
          var soundConfig ={
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
          }
          this.audio = this.sound.add("drillNoises");
          this.audio.play(soundConfig);
            this.build = this.add.sprite(config.width / 3, config.height / 2, "building");
            this.anims.create({
                key: "build_anim",
                frames: this.anims.generateFrameNumbers("building"),
                frameRate: 2,
                repeat: 0
            });
            this.build.play("build_anim");
            this.build.scale = 1.5;

            const message = this.add.text(config.width - 700, config.height / 2 - 150, 'Congratulations!\nScore: ' + score + '\nYou did it!', style);

            this.createCorrectPageButton()


        }else{

            this.wrong = this.add.image(config.width / 3 - 100, config.height / 2, "wrong");

            const message = this.add.text(config.width - 850, config.height / 2 - 250, 'Oh no!\nThe schedule did not work.\n\nScore: ' + score + '\nHint: You misplaced ' + hint, style);
            
            this.createTryAgainButton()
    
        }

    }

    createCorrectPageButton() {
      var bg = this.add.image(0, 0, "back_to_map");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width - 500, config.height / 2 + 200);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToMainScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
    }

    createTryAgainButton() {
      var bg = this.add.image(0, 0, "try_again_button");
      var text = this.add.text(0, 0, "");

      var container = this.add.container(20, 10, [ bg, text ]);

      container.setSize(bg.width, bg.height);
      container.setPosition(config.width - 500, config.height / 2 + 200);
      container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateScene());

      //this doesn't entirely work yet
      container.on('pointerover', function () {
        bg.setTint(0xffffff);
      });

      container.on('pointerout', function () {
        bg.clearTint();
      });
    }

    updateToMainScene() {
        this.scene.start("MainMap");
    }

    updateScene(){
        const lev = this.level;
        this.scene.start(lev);
    }


}
