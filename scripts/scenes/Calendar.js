class Calendar extends Phaser.Scene {
  constructor() {
    super("Calendar");
  }
  preload() { 
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    
}
  create() {
    //this.background = this.add.image(0, 0, "background").setOrigin(0).setScale(7);
    //this.add.text(20, 20, "Tutorial...");
    var graphics = this.add.graphics();
    graphics.lineStyle(1,0xf00,1);
    const backButton = this.add
      .text(config.width / 3, config.height - 150, "Go Back", {
        font: "50px Arial",
        fill: "#0f0",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.updateScene());
    this.gen_list(3);
    this.gen_calendar(graphics);
    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", function (pointer, gameObject) {
      gameObject.clearTint();
    });
  }

  updateScene() {
    this.scene.start("MainMenu");
  }
  gen_list(num) {
    for (var i = 0; i < num; i++) {
      var tmp = this.add
        .text(100, (i * config.height) / num, "item" + i.toString(), {
          fontSize: "30px",
          fill: "#0f0",
          backgroundColor: "#3eaae8"
        })
        .setInteractive({ useHandCursor: true });
      this.input.setDraggable(tmp);
      
    }
  }
  gen_calendar(graphics){
    for(var i=0;i<7;i++){
      for(var j=0;j<3;j++){
        graphics.strokeRect((7+2*i)*config.width/21, (j * config.height) / 3,2*config.width/21,config.height/ 3);
      }
      console.log(i);
    }
  }
}
