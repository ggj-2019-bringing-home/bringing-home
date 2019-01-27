import Player from '../sprites/Player'
import Space from '../sprites/Space'
import SoundHandler from "../helpers/SoundHandler";

class ModeSwitcher {
    constructor(scene) {
        this.scene = scene;
        this.delta = 16.667 / 1000;
        this.lerpValue = 1.5;
        this.minScale = .1;
        this.maxScale = 25;
        this.state = 0; // State 0 = playing, state 1 = paused
        this.targetScale = 3;
        this.curScale = this.maxScale;
        this.timers = [];

        this.scene.time.addEvent({
            delay: this.delta * 1000,
            callback: this.update,
            callbackScope: this,
            loop: true
        });
        this.scene.events.on('lerpfinished', this.stateChange, this);
    }

    registerTimer(timer) {
        this.timers.push(timer);
    }

    update() {
        let dirty = false;
        if (this.targetScale > this.curScale) {
            dirty = true;
            this.curScale += this.lerpValue * this.delta * (this.getDistance() / 50 + 0.01);
            if (this.targetScale <= this.curScale) {
                this.curScale = this.targetScale;
                this.scene.sys.events.emit('lerpfinished', this.curScale === this.maxScale ? 1 : 0);
            }
        } else if (this.targetScale < this.curScale) {
            dirty = true;
            this.curScale -= this.lerpValue * this.delta * (this.getDistance() / 50 + 0.01);
            if (this.targetScale >= this.curScale) {
                this.curScale = this.targetScale;
                this.scene.sys.events.emit('lerpfinished', 0);
            }
        }
        if (dirty) {
            this.scene.cameras.main.setZoom(this.curScale);
        }
    }

    getDistance() {
        return Math.abs(this.targetScale - this.curScale) / (this.lerpValue * this.delta);
    }

    pause() {
        this.targetScale = this.maxScale;
    }

    addTarget(val) {
        this.targetScale += val;
        if (this.targetScale > this.maxScale) {
            this.targetScale = this.maxScale;
        }
        if (this.targetScale < this.minScale) {
            this.targetScale = this.minScale;
        }
    }

    stateChange(newState) {
        console.log(newState);
        this.state = newState;
        if (this.state === 1) {
            this.timers.forEach(t => {
                if (typeof(t.pause) === 'function')
                    t.pause();
                else
                    t.paused = true;
            });
        } else {
            this.timers.forEach(t => {
                if (typeof(t.resume) === 'function')
                    t.resume();
                else
                    t.paused = false;
            });
        }
    }

    isRunning() {
        return this.state === 0;
    }
}

class PlanetScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlanetScene'
        });
    }

    preload() {
        this.load.image('space', 'assets/space.jpg');
        this.load.atlas('rocks', 'assets/rocks.png', 'assets/rocks.json');
        this.size = 2048;
        this.POSSIBLE_PARTICLES = [
            'white',
            'blue',
            'green',
            'red',
            'yellow'
        ];
        this.soundHdl = new SoundHandler(this);
        this.soundHdl.preload();
    }

    create(cfg) {
        if (! cfg.level){
            cfg.level = 1;
        }
        this.scene.bringToTop();
        //this.background = this.add.tileSprite(0, 0, 3353, 3353,'space');
        this.graphics = this.add.graphics();
        this.modeSw = new ModeSwitcher(this);
        this.graphics.setTexture('space');
        this.graphics.fillRect(0, 0, 3353, 3353);

        this.cameras.main.setBounds(0, 0, this.size, this.size);

        this.keys = {
            'plus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            'minus': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            'a': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            'y': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y),
            'p': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        };

        let sh = window.screen.availHeight;
        let sw = window.screen.availWidth;

        this.graphics.fillStyle(0xcccc00, .8);
        this.graphics.setTexture();
        this.graphics.fillCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, 32));

        this.graphics.lineStyle(1, 0xffffff, .4);
        for (let l = 64 + 32; l < this.size / 2; l += 64) {
            this.graphics.strokeCircleShape(new Phaser.Geom.Circle(this.size / 2, this.size / 2, l))
        }

        let ring = 3;
        let dist = 32 + (64 * ring);
        this.player = new Player(this, (this.size / 2) + dist, this.size / 2, ring);
        this.modeSw.registerTimer(this.time.addEvent({
            delay: 16.667,
            callback: this.player.update,
            callbackScope: this.player,
            loop: true
        }));
        //this.player.
        this.space = new Space(this, this.player);
        this.space.riseLevel();
        if (cfg.level > 1) this.space.riseLevel();
        if (cfg.level > 2) this.space.riseLevel() && this.space.riseLevel();


        this.soundHdl.start();
        this.events.on('collision', this.soundHdl.collide, this.soundHdl);
        this.events.on('collision', this.collisionDetected, this);
        this.events.on('message', (...params) => console.log(params), this);
        this.cameras.main.startFollow(this.player);
    }

    collisionDetected(...params) {
        console.log(params);
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
                this.modeSw.addTarget(.2);
                this.keys.up.isDown = false
            }
            if (this.keys.down.isDown) {
                this.modeSw.addTarget(-.2);
                this.keys.down.isDown = false
            }
            if (this.keys.p.isDown) {
                this.modeSw.pause();
                this.keys.p.isDown = false
            }
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
