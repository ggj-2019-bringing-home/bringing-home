class PlanetScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'PlanetScene'
        });
    }
    preload() {
        //this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');
    }
    create() {
        this.scene.bringToTop();
        console.log(this);


        //let sh = window.screen.availHeight;
        //let sw = window.screen.availWidth;
        //this.startGame();
        var dudeData = [
        '.......3.....',
        '......333....',
        '....5343335..',
        '...332333333.',
        '..33333333333',
        '..37773337773',
        '..38587778583',
        '..38588888583',
        '..37888888873',
        '...333333333.',
        '.F....5556...',
        '3E34.6757.6..',
        '.E.55.666.5..',
        '......777.5..',
        '.....6..7....',
        '.....7..7....'
        ];

        this.textures.generate('dude', { data: dudeData, pixelWidth: 4, pixelHeight: 4 });
        this.add.image(100, 100, 'dude').setAlpha(0.4);
        console.log(this.textures.getPixel(8,5,'dude'));
        console.log(this.textures);
    }

    update(time, delta) {

    }

    startGame() {
        this.scene.stop('GameScene');
        this.registry.set('attractMode', false);
        this.scene.start('GameScene');
    }

    restartScene() {
        //        this.attractMode.stop();
        this.scene.stop('GameScene');
        this.scene.launch('GameScene');
        this.scene.bringToTop();

        this.registry.set('restartScene', false);
    }
}

export default PlanetScene;
