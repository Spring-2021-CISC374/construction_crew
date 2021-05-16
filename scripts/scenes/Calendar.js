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
    this.data = data;
  }
  create() {
    
    
    this.background = this.add.image(0, 0, "sunset").setOrigin(0).setScale(3);

    var graphics = this.add.graphics();
    let self = this;
    graphics.lineStyle(1, 0xf00, 1);

    this.createBackToMapButton();

    var bg = this.add.image(0, 0, "build_button");
    var text = this.add.text(0, 0, "");
    var container = this.add.container(20, 10, [bg, text]);

    container.setSize(bg.width, bg.height);
    container.setPosition(config.width - 250, config.height - 140);
    container.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.score(this.data.level));
    this.arr = [];
    this.gen_list(this.data.contractor);
    this.gen_calendar(graphics, 5);
    this.input.on("dragstart", function (pointer, gameObject) {
      this.children.bringToTop(gameObject);
    }, this);
    var hint = this.add.image(config.width-50,50,"hint").setScale(0.3);
    hint.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.testMessageBox());


    this.input.on('drop', function (pointer, gameObject, dropZone) {
      if (dropZone.getData('item') == 1) {
        gameObject.x = gameObject.getData("x");
        gameObject.y = gameObject.getData("y");
      }
      else {
        if(self.data.weather.includes(dropZone.getData('zoneid')) /*&& gameObject.getData("jobid") == "Painter"*/){
          alert('Are you sure you\'d like to schedule ' + gameObject.getData("jobid") + ' on a rainy day?');
        }
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        dropZone.setData('item', 1);
        dropZone.setData('jobid', gameObject.getData('jobid'));
        gameObject.setData('zoneid', dropZone.getData('zoneid'));
      }


    });

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      var zoneid = gameObject.getData('zoneid')
      gameObject.x = dragX;
      gameObject.y = dragY;
      if (zoneid != -1) {
        self.clean_zone(zoneid);
        gameObject.setData('zoneid', -1);
      }
    });

    this.input.on("dragend", function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.getData("x");//gameObject.input.dragStartX;
        gameObject.y = gameObject.getData("y");//gameObject.input.dragStartY;
      }
    });

    this.input.on('gameobjectover', function (pointer, gameObject) {
      if(gameObject.getData('jobname')!=null){
        self.tooltip = self.add.text(pointer.x,pointer.y,gameObject.getData('jobid'),
        {
          font: "25px Arial",
          fill: "#000",
          backgroundColor: "#f9e305",
          padding: 10
        });
        //console.log(gameObject.getData('jobid'));
      }

    });
    this.input.on('gameobjectout', function (pointer, gameObject) {
      if(gameObject.getData('jobname')!=null){
        self.tooltip.destroy();
        //console.log(gameObject.getData('jobid'));
      }
      //console.log('out');

    });
  }

  updateScene() {
    this.scene.start("MainMenu");
  }
  clean_zone(zoneid) {
    this.arr[zoneid].setData('item', 0);
    this.arr[zoneid].setData('jobid', -1)
  }
  gen_list(contractor) {
    var scales = { "Concrete": 1, "Farmer": 1, "Plumber": 0.2, "Roofer": 0.5, "Electrician": .5, "Painter": 0.05 };

    var startx = 525;
    var starty = 600;
    var endx = config.width - 375;
    var width = (endx - startx) / contractor.length;
    var padding = 100;
    contractor = contractor.sort(() => Math.random() - 0.5);
    for (var i = 0; i < contractor.length; i++) {
      /*var tmp = this.add
        .text(startx+i*width, starty, contractor[i], {
          fontSize: "30px",
          fontStyles: "bold",
          fill: "#0f0",
          backgroundColor: "#3eaae8",
          padding: 10
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);*/
      var tmp = this.add
        .image(startx + i * width, starty, contractor[i].toLowerCase())
        .setScale(scales[contractor[i]])
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
      tmp.setData("x", tmp.x);
      tmp.setData("y", tmp.y);
      tmp.setData("jobid", contractor[i]);
      tmp.setData("jobname", contractor[i]);
      tmp.setData("zoneid", -1);
      this.input.setDraggable(tmp);

    }
  }

  gen_calendar(graphics) {
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var startx = 100;
    var endx = config.width - 100;
    var starty = 100;
    var width = (endx - startx) / 7;
    var height = 200;//(endy - starty) / 7;
    var blocked = this.data.blocked;
    var rows = this.data.rows;
    var weather = this.data.weather;
    //console.log(blocked);

    for (var i = 0; i < 7; i++) {
      this.add.text(startx + width * i + 50, 50, week[i], {
        font: "25px Arial",
        fill: "black"
      });
    }
    var color = 0xff0000;
    var whiteTransparent = 0xffffff
    for(var j = 0; j < rows; j++) {
      for (var i = 0; i < 7; i++) {
        var zone = this.add.zone(startx + width * i + width / 2, starty * 2 + j * height, width, height).setRectangleDropZone(width, height);
        //graphics.strokeRect(startx + width, i * height + starty, width, height)
        
        if(weather.includes(i)) {
          this.add.image(startx + width * i + width / 2,starty * 2 + j * height, "storm").setScale(.3);
        }

        if (blocked.includes(i)) {
          graphics.fillStyle(color);
          graphics.fillRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height).setAlpha(0.5);
          zone.disableInteractive();
       }

        else {
          graphics.fillStyle(whiteTransparent);
          graphics.fillRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height).setAlpha(0.3);
        }
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        zone.setData('zoneid', j*7+i)
        zone.setData('jobid', -1);
        this.arr.push(zone);
      }
    }

  }

  get_data() {
    let res = new Object();

    this.arr.forEach(element => {
      if (element.getData('jobid') != -1) {
        res[element.getData('jobid')] = parseInt(element.getData('zoneid'));
        console.log(element.getData('zoneid'));
      }
    });
    return res;
  }
  
  score(level) {
    level -= 1;
    var levelone = ["Roofer", "Electrician", "Painter"];
    var leveltwo = ["Plumber", "Roofer", "Electrician", "Painter"];
    var levelthree = ["Concrete", "Farmer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levelfour = ["Concrete", "Farmer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levelfive = ["Concrete", "Farmer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levelsix = ["Concrete", "Farmer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levelseven = ["Concrete", "Farmer", "Plumber", "Roofer", "Electrician", "Painter"];
    var levels = [levelone, leveltwo, levelthree, levelfour, levelfive, levelsix, levelseven];
    var names = ['LevelOne', 'LevelTwo', 'LevelThree', 'LevelFour', 'LevelFive', 'LevelSix', 'LevelSeven'];
    var score = 0;
    var correct = 5;
    var result = this.get_data();
    console.log(result);
    var weather = this.data.weather;
    
    var block = this.data.blocked;

    delete result['undefined'];

    var hint = 'none';

    //console.log(result);
    if (Object.keys(result).length != levels[level].length) {
      alert('Please finish all the contractors');
      return;
    }


    for (var i = 1; i < levels[level].length; i++) {
      var after = levels[level][i];
      var before = levels[level][i - 1]

      if (result[after] > result[before]) {
        score += correct;
      }else{
        hint = before;
      }

      /* -2 for each open slot
      if(level == 1 && i == levels[level].length - 1 && result[after] == 6){
        score -= 2;
      }else if(level == 2 && i == levels[level].length - 1 && (result[after] == 13 || result[after] == 12)){
        score -= (result[after] - 11) * 2;
      }
      */

      var rainy_work = weather.filter(x => Object.values(result).includes(x));
      score -= correct*rainy_work.length;
      
    }

    if (result[levels[level][levels[level].length - 1]] > result[levels[level][0]]) {
      score += correct;
    }

    /* Scoring passing
    if(level == 1){
      var full_point = (score >= levels[level].length * correct - 2);
    }else if(level == 2){
      var full_point = (score >= levels[level].length * correct - 4);
    }else{
      var full_point = (score >= levels[level].length * correct);
    }
    */
    var full_point = (score >= levels[level].length * correct);
    var high_score = localStorage.getItem(names[level]) || 0;
    if(score > high_score){
      localStorage.setItem('score',localStorage.getItem('score')-high_score+score);
      localStorage.setItem(names[level],score);
    }
    this.scene.start("Build", { message: full_point, level: names[level], score: score, hint: hint });
    console.log(score);

  }

  createBackToMapButton() {
    var bg = this.add.image(0, 0, "back_to_map");
    var text = this.add.text(0, 0, "");

    var container = this.add.container(20, 10, [bg, text]);

    container.setSize(bg.width, bg.height);
    container.setPosition(250, config.height - 140);
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

  //box
  testMessageBox() {
    this.showMessageBox("Remember! Start off by scheduling a subcontractor to lay out the concrete for a strong foundation. Then, schedule your farmer!" +
    "\nIt also might be rainier than last time, so be careful when you schedule your workers!", config.width * .7, config.height * .5);
  }
  showMessageBox(text, w = 300, h = 300) {
    if (this.msgBox) {
        this.msgBox.destroy();
    }
    
    var back = this.add.image(0, 0, "boxBG");
    //make the close button
    var closeButton = this.add.image(0, 0, "closeButton");
    //make a text field
    var text1 = this.add.text(0, 0, text,{
      font: "35px Arial",
      fill: "black",
      align: "center"
    });
    console.log(text1.width);
    console.log(text1.height);
    text1.setWordWrapWidth(w * .9);
    back.displayWidth  = w;
    back.displayHeight  = h;
    var msgBox = this.add.container(20, 10, [back,closeButton,text1]);
    //
    //set the close button
    //in the center horizontally
    //and near the bottom of the box vertically
    closeButton.x = 0;
    closeButton.y = h/2 - closeButton.height/2;
    
    closeButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.hideBox());
    msgBox.setPosition(config.width / 2 - msgBox.width / 2,config.height / 2 - msgBox.height / 2)
    //
    //set the text in the middle of the message box
    text1.x = -text1.width/2;
    text1.y = -text1.height/2;


    //make a state reference to the messsage box
    this.msgBox = msgBox;
  }
  hideBox() {
    //destroy the box when the button is pressed
    console.log(this.msgBox);
    this.msgBox.destroy(true);
  }
}

