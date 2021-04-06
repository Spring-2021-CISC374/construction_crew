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
    graphics.lineStyle(1, 0xf00, 1);
    const backButton = this.add
      .text(config.width / 3, config.height - 150, "Go Back", {
        font: "50px Arial",
        fill: "#0f0",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.updateScene());
    this.gen_list(3);
    this.gen_calendar(graphics, 5);
    this.input.on("dragstart", function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drop', function (pointer, gameObject, dropZone) {

      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;

      //gameObject.input.enabled = false;

    });

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      console.log('test');
    });

    this.input.on("dragend", function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.getData("x");//gameObject.input.dragStartX;
        gameObject.y = gameObject.getData("y");//gameObject.input.dragStartY;
      }
    });

    this.input.on('gameobjectover', function (pointer, gameObject) {

      console.log('over');

    });
    this.input.on('gameobjectout', function (pointer, gameObject) {

      console.log('out');

    });
  }

  updateScene() {
    this.scene.start("MainMenu");
  }
  gen_list(num) {
    var startx = 100;
    var padding = 60;
    for (var i = 0; i < num; i++) {
      var tmp = this.add
        .text(100, i * padding + startx, "item" + i.toString(), {
          fontSize: "30px",
          fontStyles: "bold",
          fill: "#0f0",
          backgroundColor: "#3eaae8",
          padding: 10
        })
        .setInteractive({ useHandCursor: true });
      tmp.setData("x", tmp.x);
      tmp.setData("y", tmp.y);
      this.input.setDraggable(tmp);

    }
  }
  gen_calendar(graphics, y) {
    var startx = config.width / 3 + 100;
    var endx = config.width - 100;
    var starty = 100;
    var endy = config.height - 100;
    var width = (endx - startx) / 7;
    var height = (endy - starty) / y;
    //this.add.grid(startx, starty, endx - startx, endy - starty, width, height).setOutlineStyle(0xfff).setOrigin(0, 0);
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < y; j++) {
        var zone = this.add.zone(startx + i * width, j * height + starty, width, height).setRectangleDropZone(width, height);
        graphics.strokeRect(startx + i * width, j * height + starty, width, height);

      }
    }
  }
}
