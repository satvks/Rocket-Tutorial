console.log("In Play");
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('rocket', 'assets/rocket.png');
    }

    create() {

        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
            ).setOrigin(0,0);

        this.p1Rocket = new Rocket( // create player
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );

        this.ship01 = new Ship(
            this,
            100,
            200,
            'spaceship',
        );
        
        this.ship02 = new Ship(
            this, 
            300, 
            280,
            'spaceship'
            ).setOrigin(0,0);
        
        this.ship03 = new Ship(
            this,
            game.config.width,
            borderUISize*6 + borderPadding*4,
            'spaceship'
            ).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // fire
        // keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // does nothing
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // move left
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
    }

    update() {
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        this.checkCollision(this.p1Rocket, this.ship01);
        this.checkCollision(this.p1Rocket, this.ship02);
        this.checkCollision(this.p1Rocket, this.ship03); 
    }

    checkCollision(rocket, ship) {
        if(rocket.x + rocket.width > ship.x &&
            rocket.x +rocket.width < ship.x + ship.width &&
            rocket.y > ship.y &&
            rocket.y < ship.y + ship.width) {
                ship.alpha = 0;
                rocket.reset();
                ship.reset();
            }
    }
}