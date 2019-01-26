import Player from '../sprites/Player'
import Space from '../sprites/Space'

class PlanetScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlanetScene'
        })
    }

    preload() {
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.load.atlas('rocks', 'assets/rocks.png', 'assets/rocks.json');
        this.size = 2048
        this.POSSIBLE_PARTICLES = [
            'white',
            'blue',
            'green',
            'red',
            'yellow'
        ];
    }

    create() {
        this.scene.bringToTop();
        const graphics = this.add.graphics();

        this.cameras.main.setBounds(0, 0, this.size, this.size);
        this.zoom = 3.5;
        this.cameras.main.setZoom(this.zoom);

        this.keys = {
            'plus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            'minus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            'a': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            'y': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
        };

        let sh = window.screen.availHeight;
        let sw = window.screen.availWidth;


        graphics.fillStyle(0xcccc00, .8);
        graphics.fillCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, 32));

        graphics.lineStyle(1, 0xffffff, .4);
        for (let l = 64 + 32; l < this.size / 2; l += 64) {
            graphics.strokeCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, l))
        }

        let ring = 2;
        let dist = 32 + (64 * ring);
        this.player = new Player(this, (this.size / 2) + dist, this.size / 2, ring);
        this.time.addEvent({
            delay: 16.667,
            callback: this.player.update,
            callbackScope: this.player,
            loop: true
        });
        //this.player.
        this.space = new Space(this, this.player);
        this.space.riseLevel();
        this.space.riseLevel();
        this.space.riseLevel();
        this.space.riseLevel();

        this.cameras.main.startFollow(this.player)
    }

    update(time, delta) {
        if (this.keys) {
            if (this.keys.plus.isDown) {
                this.player.switchRing(1);
                this.keys.plus.isDown = false
            }
            if (this.keys.minus.isDown) {
                this.player.switchRing(-1);
                this.keys.minus.isDown = false
            }
            if (this.keys.up.isDown) {
                this.zoom += .2;
                this.keys.up.isDown = false
            }
            if (this.keys.down.isDown) {
                this.zoom -= .2;
                this.keys.down.isDown = false
            }
            this.cameras.main.setZoom(this.zoom);
            if (this.keys.a.isDown) {
                this.player.grow(1);
                this.keys.a.isDown = false
            }
            if (this.keys.y.isDown) {
                this.player.grow(-1);
                this.keys.y.isDown = false
            }
        }
    }
}

export default PlanetScene
