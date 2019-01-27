export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'IntroScene'
        });
    }

    preload() {
        this.types = [
            'amphibians',
            'bird',
            'carnivore',
            'coral',
            'flowers',
            'herbivore',
            'herbs',
            'omnivore',
            'seaweed',
            'weed'
        ];
        this.icons = [
            'rect',
            'tick'
        ];
        this.load.atlas('icons', 'assets/icons.png', 'assets/icons.json');
        this.headings = [
            'Level one : Once upon a time',
            'Level two : Green hands',
            'Level three : Mraou, animals are coming'
        ];
        this.quests = [
            [
                'Get some water!\n',
                'Create a planet with stone and water.'
            ],
            [
                'Get some plants!\n',
                'FLOWERS and HERBS > WEED'
            ],
            [
                'Get some animals!\n',
                'Keep enough plants, even with animals\n',
                'HERBIVORE > BIRDS'
            ]
        ];
        this.desciptions = [
            {},
            {
                herbs: 'HERB like cold weather.\n',
                flowers: 'FLOWERS like hot weather.\n',
                weed: 'WEED don\'t like to be with herb\nand it really love eating FLOWERS.',
                seaweed: 'SEAWEED are eating CORAL.\n',
                coral: 'CORAL are eating SEAWEED and\nhates cold weather.'
            },
            {
                herbivore: 'HERBIVORE are eating the HERB and FLOWERS.\n',
                omnivore: 'OMNIVORE are eating WEED and CARNIVORE.\n',
                carnivore: 'CARNIVORE are eating BIRDS and Herbivore.\n',
                birds: 'BIRDS are eating AMPHIBIANS.\n',
                amphibians: 'AMPHIBIANS are eating Coral and Omnivore.\n'
            }
        ];
    }

    create(data) {
        this.levelIdx = data.level - 1;
        const card = this;
        // Background
        const gfx = this.add.graphics();
        gfx.fillStyle(0x1E1B1B, 1);
        gfx.fillRect(0,0,this.game.config.width, this.game.config.height);

        // Texts
        this.add.text(
            this.game.config.width / 6,
            100,
            this.headings[this.levelIdx],
            {
                font: '40px Verdana',
                fill: '#D5C8C8'
            }
        );
        let i = 0;
        this.add.text(
            this.game.config.width / 4,
            (this.game.config.height / 6) + 75,
            this.quests[this.levelIdx].reduce((res, cur) => {
                const imgPos = (card.game.config.height / 6) + 92 + (i++ * 74);
                card.add.image(
                    (this.game.config.width / 4) - 40,
                    imgPos, 'icons', 'rect'
                );
                res += `${cur}\n`;
                return res;
            }, ''),
            {
                font: '30px Verdana',
                fill: '#D5C8C8'
            }
        );
        // Todo Add boxes
        i = 0;
        let x = 60;
        Object.keys(this.desciptions[this.levelIdx]).slice(0, 3).forEach(c => {
            card.add.text(
                x + 40,
                2 * (card.game.config.height / 5) + (++i * 118),
                card.desciptions[this.levelIdx][c],
                {
                    font: '24px Verdana',
                    fill: '#D5C8C8'
                }
            );
            card.add.image(x, 2.5 * (card.game.config.height / 5) + (i * 118) - 60, 'icons', c);
        });
        i = 0;
        x += this.game.config.width / 2;
        Object.keys(this.desciptions[this.levelIdx]).slice(3).forEach(c => {
            card.add.text(
                x + 40,
                2 * (card.game.config.height / 5) + (++i * 118),
                card.desciptions[this.levelIdx][c],
                {
                    font: '24px Verdana',
                    fill: '#D5C8C8'
                }
            );
            card.add.image(x, 2.5 * (card.game.config.height / 5) + (i * 118) - 60, 'icons', c);
        });
        // Todo Add Images

        this.input.once('pointerdown', function (event) {
            this.scene.start('PlanetScene', {level: data.level});
            this.scene.start('UiScene');
        }, this);
    }
}
