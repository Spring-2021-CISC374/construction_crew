class Calendar extends Phaser.Scene {
  arr = [];
  constructor() {
    super("Calendar");
    
  }
  preload() {
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
  }

  create() {
    this.background = this.add.image(0, 0, "build_background").setOrigin(0);

    var graphics = this.add.graphics();
    let self = this;
    graphics.lineStyle(1, 0xf00, 1);
    const backButton = this.add
      .text(config.width / 3, config.height - 150, "Go Back", {
        font: "50px Arial",
        fill: "#0f0",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.updateScene());
    this.add.text(200, config.height - 150, "submit", {
      font: "50px Arial",
      fill: "#6cf"
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.scene.start('Score', this.get_data()));
    this.gen_list(3);
    this.gen_calendar(graphics, 5);
    this.input.on("dragstart", function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      if (dropZone.getData('item') == 1) {
        gameObject.x = gameObject.getData("x");
        gameObject.y = gameObject.getData("y");
      }
      else {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        dropZone.setData('item', 1);
        dropZone.setData('jobid',gameObject.getData('jobid'));
        gameObject.setData('zoneid',dropZone.getData('zoneid'));
      }


      //gameObject.input.enabled = false;

    });

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      var zoneid = gameObject.getData('zoneid')
      gameObject.x = dragX;
      gameObject.y = dragY;
      if(zoneid != -1){
        self.clean_zone(zoneid);
        gameObject.setData('zoneid',-1);
      }
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
  clean_zone(zoneid){
    this.arr[zoneid].setData('item',0);
    this.arr[zoneid].setData('jobid',-1)
  }
  gen_list(num) {
    var startx = 100;
    var starty = 500;
    var padding = 200;
    for (var i = 0; i < num; i++) {
      var tmp = this.add
        .text(startx + i * padding, starty, "item" + i.toString(), {
          fontSize: "30px",
          fontStyles: "bold",
          fill: "#0f0",
          backgroundColor: "#3eaae8",
          padding: 10
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
      tmp.setData("x", tmp.x);
      tmp.setData("y", tmp.y);
      tmp.setData('jobid',i);
      tmp.setData('zoneid',-1);
      this.input.setDraggable(tmp);

    }
  }

  gen_calendar(graphics, y) {
    var week=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var startx = 100;
    var endx = config.width - 100;
    var starty = 100;
    var endy = config.height - 75;
    var width = (endx - startx) / 7;
    var height = 200;//(endy - starty) / 7;
    
    for (var i = 0; i < 7; i++) {
      var zone = this.add.text(startx + width * i + 50, 50, week[i],{
        font: "25px Arial",
        fill: "black"
      });
    }

    for (var i = 0; i < 7; i++) {
      var zone = this.add.zone(startx + width * i + width/2, starty + height/2, width, height).setRectangleDropZone(width, height);
      //graphics.strokeRect(startx + width, i * height + starty, width, height);
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
      zone.setData('zoneid', i)
      zone.setData('jobid',-1);
      this.arr.push(zone);
    }

  }

  get_data(){
    var data={};
    this.arr.forEach(element => {
      if(element.getData('jobid')!=-1){
        data[element.getData('zoneid')] = element.getData('jobid');
      }
    });
    return data;
  }
}
