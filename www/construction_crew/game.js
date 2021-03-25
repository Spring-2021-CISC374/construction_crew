var config = {
  width: 256 *2,
  height: 600,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  score: 100,
  size: 1,
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}

var game = new Phaser.Game(config);
