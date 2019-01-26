export default class Hud extends Phaser.GameObjects.Graphics {
    constructor (scene, planet) {
        super(scene, {x: 0, y:0});

        this.width = 200;
        this.height = 150;
        this.colors = {
            white: 0xffffff,
            blue: 0x0000ff,
            green: 0x00ff00,
            red: 0xff0000,
            yellow: 0xffff00
        };
        this.planet = planet;
        this.displayZone = new Phaser.Geom.Rectangle((scene.size - this.width, scene.size - this.height, this.width, this.height);

        // Frame
        this.gfx = scene.add.graphics();
        this.gfx.lineStyle(2, this.colors.white, 1);
        this.gfx.strokeRect(this.displayZone.x, this.displayZone.y, this.width, this.height);

        this.texts = {};
        let offsety = 10;
        Object.keys(this.colors).forEach(c => {
            this.texts[c] = this.scene.add.text(
                this.displayZone.x + 3,
                this.displayZone.y + offsety,
                `: ${this.planet.values[c]}`,
                {color: this.colors[c]}
            );
            offsety += 18;
        });

        scene.add.existing(this);
    }

    update() {
        const hud = this;
        if (this.colors)
            Object.keys(this.colors).forEach(c => hud.texts[c].setText(`■: ${hud.planet.values[c]}`));
    }
}
