export default class Howtoplay extends Phaser.Scene {
    constructor() {
        super({
            key: 'Howtoplay'
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
            this.game.config.height / 6,
            'How to play?',
            {
                font: '36px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            2 * (this.game.config.height / 6),
            'Left and Right: move from one circle to another.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            3 * (this.game.config.height / 6),
            'Be careful, temperature will change depending\n' +
            'on the distance you are from the sun.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            4 * (this.game.config.height / 6),
            'Up and down to zoom in and out of your planet.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 6,
            5 * (this.game.config.height / 6),
            'The more you zoom in, the more feedback from\n' +
            'your planet you get.',
            {
                font: '32px Verdana',
                fill: '#D5C8C8'
            }
        );

        this.input.once('pointerdown', function (event) {
            this.scene.start('IntroScene', {level: 1});
        }, this);
    }
}
