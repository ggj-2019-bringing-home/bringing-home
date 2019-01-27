export default class Titlescreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'Titlescreen'
        });
    }

    preload() {

    }

    create() {
        // Background
        const gfx = this.add.graphics();
        gfx.fillStyle(0x1E1B1B, 1);
        gfx.fillRect(0,0,this.game.config.width, this.game.config.height);

        // Texts
        this.add.text(
            this.game.config.width / 6,
            this.game.config.height / 5,
            'BRINGING HOME',
            {
                font: '60px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            2 * (this.game.config.height / 5),
            'Press start to play\n' +
            'Or if you don\'t find start, click.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );

        this.input.once('pointerdown', function (event) {
            this.scene.start('Howtoplay');
        }, this);
    }
}
