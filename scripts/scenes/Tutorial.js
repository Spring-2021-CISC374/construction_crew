class Tutorial extends Phaser.Scene {
  constructor() {
    super("Tutorial");
  }

  create() {

    this.add.text(config.width/2.75, config.height/25, "Construction Crew", {
      font: "50px Arial",
      fill: "black"
    });

    this.add.text(config.width/6, config.height/7, "Welcome to this new game to learn about scheduling. The objective is to make a schedule that orders the subcontractors correctly", {
      font: "20px Arial",
      fill: "black"
    });

    this.add.text(config.width/3, config.height/5, "Please use the following order as the correct order", {
      font: "20px Arial",
      fill: "black"
    });



    const concrete = this.add.image(config.width/2 - 500, config.height / 2, "concrete");
    concrete.scale = 0.05;

    this.add.text(config.width/2 - 550, config.height / 2 + 75, "concrete", {
      font: "20px Arial",
      fill: "black"
    });

    const framer = this.add.image(config.width/2 - 275, config.height / 2, "framers");

    this.add.text(config.width/2 - 325, config.height / 2 + 75, "framer", {
      font: "20px Arial",
      fill: "black"
    });

    const roofer = this.add.image(config.width/2, config.height / 2, "roofer");
    roofer.scale = 0.35;

    this.add.text(config.width/2 - 50, config.height / 2 + 75, "roofer", {
      font: "20px Arial",
      fill: "black"
    });

    const plumer = this.add.image(config.width/2 + 275, config.height / 2, "plumer");
    plumer.scale = 0.35;

    this.add.text(config.width/2 + 250, config.height / 2 + 75, "plumer", {
      font: "20px Arial",
      fill: "black"
    });

    const painter = this.add.image(config.width/2 + 500, config.height / 2, "painter");
    painter.scale = 0.35;

    this.add.text(config.width/2 + 475, config.height / 2 + 75, "painter", {
      font: "20px Arial",
      fill: "black"
    });

    const backButton = this.add.text(config.width/2.5, config.height - 100, 'Main Menu!', {
      font: "50px Arial",
      fill: "black"
      })
      .setInteractive()
      .on('pointerdown', () => this.updateScene()
    );
    
  }

  updateScene() {
    this.scene.start("MainMenu");
  }

}
