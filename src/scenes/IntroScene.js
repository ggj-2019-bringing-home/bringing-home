export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'IntroScene'
        });
    }

    preload() {
        this.headings = [
            'Level one : Once upon a time',
            'Level two : Green hands',
            'Level three : Mraou, animals are coming'
        ];
        this.quests = [
            [
                'Get some water!\n',
                'Create a planet with stone and water.\n'
            ],
            [
                'Get some plants!',
                'FLOWERS and HERBS > WEED'
            ],
            [
                'Get some animals!',
                'Keep enough plants, even with animals',
                'HERBIVORE > BIRDS'
            ]
        ];
        this.desciptions = [
            [],
            [
                'HERB like cold weather.',
                'FLOWERS like hot weather.',
                'WEED don\'t like to be with herb and it really love eating FLOWERS.',
                'SEAWEED are eating CORAL.',
                'CORAL are eating SEAWEED and hates\ncold weather.'
            ],
            [
                'HERBIVORE are eating the HERB and FLOWERS.',
                'OMNIVORE are eating WEED and CARNIVORE.',
                'CARNIVORE are eating BIRDS and Herbivore.',
                'BIRDS are eating AMPHIBIANS.',
                'AMPHIBIANS are eating Coral and Omnivore.'
            ]
        ];
    }

    create(data) {
        this.levelIdx = data.level - 1;
        // Background
        const gfx = this.add.graphics();
        gfx.fillStyle(0x1E1B1B, 1);
        gfx.fillRect(0,0,this.game.config.width, this.game.config.height);

        // Texts
        this.add.text(
            this.game.config.width / 6,
            this.game.config.height / 6,
            this.headings[this.levelIdx],
            {
                font: '36px Verdana',
                fill: '#D5C8C8'
            }
        );
        this.add.text(
            this.game.config.width / 4,
            (this.game.config.height / 6) + 75,
            this.quests[this.levelIdx].reduce((res, cur) => {
                res += `${cur}\n`;
                return res;
            }, ''),
            {
                font: '30px Verdana',
                fill: '#D5C8C8'
            }
        );
        // Todo Add boxes
        this.add.text(
            this.game.config.width / 6,
            3 * (this.game.config.height / 5),
            this.desciptions[this.levelIdx].slice(0, 2).reduce((s, c) => `${s}${c}\n\n`, ''),
            {
                font: '30px Verdana',
                fill: '#D5C8C8'
            }
        );
        // Todo Add Images

        this.input.once('pointerdown', function (event) {
            this.scene.start('PlanetScene');
            this.scene.start('UiScene');
        }, this);
    }
}
