export default class Startpage extends Phaser.Scene {
    constructor() {
        super({
            key: 'Startpage'
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
            'Once a year, the glorious planet of Ansbach\n' +
            'is going on a big trip to find some lost souls.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            2 * (this.game.config.height / 5),
            'The souls can be particles of water, stone,\n' +
            'plants even animals! ',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            3 * (this.game.config.height / 5),
            'But oh boy, it\'s really difficult to make them\n' +
            'all happy and make them feel like home.\n' +
            'Will you be able to make all this souls feel\n' +
            'like home? Could you bring them home?',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );

        this.input.once('pointerdown', function (event) {
            this.scene.start('Titlescreen');
        }, this);
    }
}
