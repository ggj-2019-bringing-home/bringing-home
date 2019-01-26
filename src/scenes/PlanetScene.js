import Player from '../sprites/Player'
import Space from '../sprites/Space'

class PlanetScene extends Phaser.Scene {
    constructor (test) {
        super({
            key: 'PlanetScene'
        })
    }

    preload () {
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.size = 2048
    }

    create () {
        this.scene.bringToTop()
        const graphics = this.add.graphics()

        this.cameras.main.setBounds(0, 0, this.size, this.size)
        this.zoom = 3.5
        this.cameras.main.setZoom(this.zoom)

        this.keys = {
            'plus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
            'minus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            'a': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            'y': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
        };

        let sh = window.screen.availHeight
        let sw = window.screen.availWidth


        graphics.fillStyle(0xcccc00, .8)
        graphics.fillCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, 32))

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
        ]
        this.textures.generate('dude', { data: dudeData, pixelWidth: 4, pixelHeight: 4 })
        this.add.image(this.size / 2, this.size / 2, 'dude').setAlpha(0.4)

        graphics.lineStyle(1, 0xffffff, .8)
        for (let l = 64 + 32; l < this.size / 2; l += 64) {
            graphics.strokeCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, l))
        }

        let ring = 2
        let dist = 32 + (64 * ring)
        this.player = new Player(this, (this.size / 2) + dist, this.size / 2, ring)
        this.time.addEvent({
            delay: 16.667,
            callback: this.player.update,
            callbackScope:this.player,
            loop: true
        })

        this.space = new Space(this, this.size, this.player);

        this.cameras.main.startFollow(this.player)
    }

    update (time, delta) {
        if (this.keys) {
            if (this.keys.plus.isDown) {
                this.player.switchRing(1)
                this.keys.plus.isDown = false
            }
            if (this.keys.minus.isDown) {
                this.player.switchRing(-1)
                this.keys.minus.isDown = false
            }
            if (this.keys.up.isDown) {
                this.zoom += .2
                this.keys.up.isDown = false
            }
            if (this.keys.down.isDown) {
                this.zoom -= .2
                this.keys.down.isDown = false
            }
            this.cameras.main.setZoom(this.zoom)
            if (this.keys.a.isDown) {
                this.player.grow(1)
                this.keys.a.isDown = false
            }
            if (this.keys.y.isDown) {
                this.player.grow(-1)
                this.keys.y.isDown = false
            }
        }
    }

    startGame () {
        this.scene.stop('GameScene')
        this.registry.set('attractMode', false)
        this.scene.start('GameScene')
    }

    restartScene () {
        //        this.attractMode.stop();
        this.scene.stop('GameScene')
        this.scene.launch('GameScene')
        this.scene.bringToTop()

        this.registry.set('restartScene', false)
    }
}

export default PlanetScene
