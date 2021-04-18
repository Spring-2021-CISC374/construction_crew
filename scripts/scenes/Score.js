class Score extends Phaser.Scene {
    constructor() {
      super("Score");
      
    }
    init(data) {
        this.data=data;
    }

    create() {
        this.add.text(100, 100, JSON.stringify(this.data), {
            font: "50px Arial",
            fill: "#6cf"
            })
    }

}