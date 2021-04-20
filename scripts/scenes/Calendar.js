class Calendar extends Phaser.Scene {
  arr = [];
  constructor() {
    super("Calendar");

  }
  preload() {
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
  }
  init(data) {
    this.data=data;
  }
  create() {
    this.background = this.add.image(0, 0, "build_background").setOrigin(0);

    var graphics = this.add.graphics();
    let self = this;
    graphics.lineStyle(1, 0xf00, 1);

    this.createBackToMapButton();

    var bg = this.add.image(0, 0, "build_button");
    var text = this.add.text(0, 0, "");
    var container = this.add.container(20, 10, [ bg, text ]);

    container.setSize(bg.width, bg.height);
    container.setPosition(config.width - 250, config.height - 150);
    container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.score(this.data.level));
    this.arr=[];
    this.gen_list(this.data.contractor);
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

      //console.log('over');

    });
    this.input.on('gameobjectout', function (pointer, gameObject) {

      //console.log('out');

    });
  }

  updateScene() {
    this.scene.start("MainMenu");
  }
  clean_zone(zoneid){
    this.arr[zoneid].setData('item',0);
    this.arr[zoneid].setData('jobid',-1)
  }
  gen_list(contractor) {
    var startx = 200;
    var starty = 400;
    var endx = config.width - 100;
    var width = (endx - startx) / contractor.length;
    var padding = 200;
    for (var i = 0; i < contractor.length; i++) {
      var tmp = this.add
        .text(startx+i*width, starty, contractor[i], {
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
      tmp.setData('jobid',contractor[i]);
      tmp.setData('zoneid',-1);
      this.input.setDraggable(tmp);

    }
  }

  gen_calendar(graphics) {
    var week=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var startx = 100;
    var endx = config.width - 100;
    var starty = 100;
    var width = (endx - startx) / 7;
    var height = 200;//(endy - starty) / 7;
    var blocked = this.data.blocked;
    console.log(blocked);

    for (var i = 0; i < 7; i++) {
      this.add.text(startx + width * i + 50, 50, week[i],{
        font: "25px Arial",
        fill: "black"
      });
    }
    var color = 0xff0000;
    for (var i = 0; i < 7; i++) {
      var zone = this.add.zone(startx + width * i + width/2, starty + height/2, width, height).setRectangleDropZone(width, height);
      //graphics.strokeRect(startx + width, i * height + starty, width, height);
      if(blocked.includes(i)){
        graphics.fillStyle(color);
        graphics.fillRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        zone.disableInteractive();
      }
      graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
      zone.setData('zoneid', i)
      zone.setData('jobid',-1);
      this.arr.push(zone);
    }

  }

  get_data(){
    let res=new Object();

    this.arr.forEach(element => {
      if(element.getData('jobid')!=-1){
        res[element.getData('jobid')] = parseInt(element.getData('zoneid'));
        console.log(element.getData('zoneid'));
      }
    });
    return res;
  }
  score(level){
    level -= 1;
    var levelone=["Roofer","Electrician","Painter"];
    var leveltwo=["Plumber", "Roofer", "Electrician", "Painter"];
    var levelthree=["Concrete", "Framer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levels = [levelone,leveltwo,levelthree];
    var names = ['LevelOne','LevelTwo','LevelThree'];
    var score = 0;
    var correct = 5;
    var result = this.get_data();
    delete result['undefined'];
    //console.log(result);
    if(Object.keys(result).length != levels[level].length){
      alert('Please finish all the contractors');
      return;
    }
    for(var i=1;i<levels[level].length;i++){
      var after = levels[level][i];
      var before = levels[level][i-1]
      if(result[after] > result[before]){
        score += correct;
      }
    }
    if(result[levels[level][levels[level].length-1]] > result[levels[level][0]]){
      score += correct;
    }

    var full_point = (score == levels[level].length*correct);
    this.scene.start("Build",{message: full_point, level: names[level], score: score});
    console.log(score);

  }

  createBackToMapButton() {
    var bg = this.add.image(0, 0, "back_to_map");
    var text = this.add.text(0, 0, "");

    var container = this.add.container(20, 10, [ bg, text ]);

    container.setSize(bg.width, bg.height);
    container.setPosition(250, config.height - 150);
    container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.updateToMainMapScene());

    //this doesn't entirely work yet
    container.on('pointerover', function () {
      bg.setTint(0xffffff);
    });

    container.on('pointerout', function () {
      bg.clearTint();
    });
  }

  updateToMainMapScene() {
    this.scene.start("MainMap");
  }
}
