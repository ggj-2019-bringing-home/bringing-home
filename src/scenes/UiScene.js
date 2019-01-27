class UiScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'UiScene'
        });
    }

    preload() {

    }

    pad(num, size) {
        return ('000000000' + num).substr(-size);
    }

    create() {
        this.game = this.scene.get('PlanetScene');
        this.gfx = this.add.graphics();
        this.gfx.setTexture();

        this.width = 200;
        this.height = 150;
        this.displayZone = new Phaser.Geom.Rectangle(
            this.cameras.main.width - this.width,
            this.cameras.main.height - this.height,
            this.width,
            this.height
        );
        this.colors = {
            white: 0xffffff,
            blue: 0x0000ff,
            green: 0x00ff00,
            red: 0xff0000,
            yellow: 0xffff00
        };

        // Frame
        this.gfx.fillStyle(this.colors.white, .7);
        this.gfx.fillRectShape(this.displayZone);

        // Texts

        this.texts = {};
        let offsetY = 3;
        const hud = this;
        Object.keys(this.colors).forEach(c => {
            hud.texts[c] = hud.add.text(
                this.displayZone.x + 4,
                this.displayZone.y + offsetY,
                `■: 0`,
                {
                    font: '16px Arial',
                    fill: '#' + hud.pad(hud.colors[c].toString(16), 6)
                }
            );
            offsetY += 18;
        });

        this.game.events.on('collision', () => {
            const hud = this;
            Object.keys(this.colors).forEach(c => hud.texts[c].setText(`■: ${hud.game.player.values[c]}`));
        }, this);
    }
}

export default UiScene
