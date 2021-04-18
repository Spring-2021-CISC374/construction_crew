var game;
var gameWidth = 256 * 7;
var gameHeight = 750;

var config = {
  type: Phaser.CANVAS,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0xffffff,
  scene: [PreloadScene, MainMenu, Tutorial, Calendar, Score, MainMap,
          LevelOne, LevelTwo, LevelThree, FreePlay],
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
  game = new Phaser.Game(config);
  window.addEventListener("resize", resize, false);


function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
