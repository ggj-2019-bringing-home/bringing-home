import Planet from "./Planet";

const RING_PER_TICK = .007
const TIMER_PER_TICK = .05

export default class Player extends Phaser.GameObjects.Graphics {
    constructor (scene, x, y, ring) {
        super(scene, {x, y});

        this.timer = 0;
        this.gfx = this.scene.make.graphics();
        this.gfx.fillStyle(0x666666, 1);
        this.ring = ring;
        // The position changes during change <- 3am!
        this.curRingPosition = ring;
        this.size = 4;
        this.circle = new Phaser.Geom.Circle(x, y, this.size);
        this.gfx.fillStyle(0xffffff, 1);
        this.gfx.fillCircleShape(this.circle);
        this.planet = new Planet(this.scene, x, y, 129, this.circle);
        this.planet.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.gfx);
        this.scene.add.existing(this.planet);
        this.levelactual = 1;
        this.values = scene.POSSIBLE_PARTICLES.reduce((prev, cur) => {
            prev[cur] = 0;
            return prev;
        }, {});

        scene.add.existing(this);
    }

    update() {
        if (this.ring > this.curRingPosition) {
            this.curRingPosition += RING_PER_TICK;
        }
        if (this.ring < this.curRingPosition) {
            this.curRingPosition -= RING_PER_TICK;
        }
        this.timer += TIMER_PER_TICK - (0.005 + TIMER_PER_TICK)*(Math.log(1+this.curRingPosition) / Math.log(10));
        if(this.timer <= 0)
            this.timer = 0;
        this.gfx.clear();
        this.gfx.fillStyle(0x666666, 1);
        this.circle.x = (96 + (this.curRingPosition * 64)) * Math.cos(this.timer) + (this.scene.size / 2);
        this.circle.y = (96 + (this.curRingPosition * 64)) * Math.sin(this.timer) + (this.scene.size / 2);
        this.setPosition(this.circle.x, this.circle.y);
        this.circle.setPosition(this.circle.x, this.circle.y);
        this.planet.setPosition(this.circle.x, this.circle.y);
        //this.circle.setPosition(this.circle.x, this.circle.y);
        this.gfx.fillCircleShape(this.circle);
    }

    switchRing(delta) {
        this.ring += delta;
        // Don't fly too close to the sun
        if (this.ring < 1) this.ring = 1;
    }

    grow(value) {
        this.size += value/4;
        if (this.size >= 64) {
            this.size = 64;
        }
        if (this.size < 2) {
            this.size = 2;
        }
        this.circle.radius = this.size;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    collide(type, level) {
        if (type === 'flare') {
            this.values[this.scene.POSSIBLE_PARTICLES[level]]++;
            this.scene.sys.events.emit('collision');
            if (this.values.blue === 10) {
                // collected the first plant
                this.planet.collectFirstWater();
            }
            if (this.values.green === 1) {
                // collected the first plant
                this.planet.collectFirstPlant();
            }
            if (this.values.white > 20) {
                let babol = this.values.white+this.values.blue;
                babol = this.values.white/babol;
                if (babol > .9 || babol < 0.1)
                {
                    this.scene.sys.events.emit('message', 'Planet is dead');
                }
                else if (babol > .8)
                {
                    this.scene.sys.events.emit('message', 'approx 80% rock');
                }
                else if (babol > .6)
                {
                    this.scene.sys.events.emit('message', 'approx 60% rock');
                }
                else if (babol > .55)
                {
                    this.scene.sys.events.emit('message', 'approx 55% rock');
                }
                else if (babol > .5)
                {
                    this.scene.sys.events.emit('message', 'approx 50% rock');
                }
                else if (babol > .45)
                {
                    this.scene.sys.events.emit('message', 'approx 45% rock');
                }
                else if (babol > .4)
                {
                    this.scene.sys.events.emit('message', 'approx 40% rock');
                }
                else if (babol > .2)
                {
                    this.scene.sys.events.emit('message', 'approx 20% rock');
                }
            }
            if (this.values.white >= 20 && this.values.blue >= 20 && this.levelactual == 1) {
                this.levelactual++;
                this.scene.space.riseLevel();
                //this.scene.modeSw.pause();
            }
            if (this.values.green >= 25 && this.levelactual == 2) {
                this.levelactual++;
                this.scene.space.riseLevel();
            }
            if (this.values.red >= 25 && this.levelactual == 3) {
                this.levelactual++;
                this.scene.space.riseLevel();
            }
/*            if (the plant we wants && this.levelactual == 2) {
                this.levelactual++;
                this.space.riseLevel();
            }
            if (the plant we wants && this.levelactual == 3) {
                this.levelactual++;
                this.space.riseLevel();
            }*/
            switch (level) {
                case 0:
                    this.grow(1);
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
    }
}
