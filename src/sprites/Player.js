import Planet from "./Planet";

const RING_PER_TICK = .007;
const TIMER_PER_TICK = .05;

export default class Player extends Phaser.GameObjects.Graphics {
    constructor (scene, x, y, ring) {
        super(scene, {x, y});

        this.timer = 0;
        this.textureSize = 129;
        this.gfx = this.scene.add.graphics();
        this.gfx.fillStyle(0x666666, 1);
        this.ring = ring;
        // The position changes during change <- 3am!
        this.curRingPosition = ring;
        this.size = 4;
        this.circle = new Phaser.Geom.Circle(x, y, this.size);
        this.planet = new Planet(scene, 0, 0, this.textureSize, this.circle);
        scene.add.existing(this.planet);
        //scene.add.existing(this.image.mask);

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
        this.circle.x = (32 + (this.curRingPosition * 64)) * Math.cos(this.timer) + (this.scene.size / 2);
        this.circle.y = (32 + (this.curRingPosition * 64)) * Math.sin(this.timer) + (this.scene.size / 2);
        this.setPosition(this.circle.x, this.circle.y);
        this.planet.setPosition(this.circle.x, this.circle.y);

        //this.gfx.setTexture(this.image);
        //this.gfx.fillRectShape(this.imageSize);
    }

    switchRing(delta) {
        this.ring += delta;
        // Don't fly too close to the sun
        if (this.ring < 1) this.ring = 1;
    }

    grow(value) {
        this.size += value;
        if (this.size >= 50) {
            this.size = 50;
        }
        if (this.size < 2) {
            this.size = 2;
        }
        this.circle.radius = this.size;
    }

    collide(type, level) {
        if (type === 'flare') {
            this.values[this.scene.POSSIBLE_PARTICLES[level]]++;
            this.scene.sys.events.emit('collision');
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
