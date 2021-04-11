class WrongPage extends Phaser.Scene {
  constructor() {
    super("WrongPage");
  }
  preload(){
    this.load.image("frown", "assets/images/frown.png")
    this.load.image("brick", "assets/images/brick.png")
    this.load.image("frown2", "assets/images/frown2.png")
}
create(){
    this.background = this.add.image(config.width/2, config.height/2, "brick")
    this.background.setOrigin(0.5,0.5).setScale(2.5);

    this.frown = this.add.image(config.width/2, config.height/2, "frown2");

    this.add.text(config.width - 650, config.height/6, "Oops, Something \n    went wrong!", {font:"40px Arial", fill: "white"}); 
    
    const backButton = this.add.text(config.width/5, config.height - 150, 'Go Back', {
      font: "75px Arial",
      fill: "white"
      })
      .setInteractive()
      .on('pointerdown', () => this.updateScene());
  }

  updateScene() {
    this.scene.start("MainMenu");
  }
}