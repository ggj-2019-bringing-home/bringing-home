const RING_PER_TICK = .003
const TIMER_PER_TICK = .01

export default class Player extends Phaser.GameObjects.Graphics {
    constructor (scene, x, y, ring) {
        super(scene, {x, y});

        this.timer = 0;
        this.gfx = this.scene.add.graphics();
        this.gfx.fillStyle(0x666666, 1);
        this.ring = ring;
        // The position changes during change <- 3am!
        this.curRingPosition = ring;
        this.size = 4;
        this.circle = new Phaser.Geom.Circle(x, y, this.size);

        scene.add.existing(this);
    }

    update() {
        if (this.ring > this.curRingPosition) {
            this.curRingPosition += RING_PER_TICK;
        }
        if (this.ring < this.curRingPosition) {
            this.curRingPosition -= RING_PER_TICK;
        }
        this.timer += TIMER_PER_TICK;
        this.gfx.clear();
        this.gfx.fillStyle(0x666666, 1);
        this.circle.x = (32 + (this.curRingPosition * 64)) * Math.cos(this.timer) + (this.scene.size / 2);
        this.circle.y = (32 + (this.curRingPosition * 64)) * Math.sin(this.timer) + (this.scene.size / 2);
        this.setPosition(this.circle.x, this.circle.y);
        this.gfx.fillCircleShape(this.circle);
    }

    switchRing(delta) {
        this.ring += delta;
        // Don't fly too close to the sun
        if (this.ring < 1) this.ring = 1;
    }

    grow(value) {
        this.size += value;
        if (this.size < 2) {
            this.size = 2;
        }
        this.circle.radius = this.size;
    }
}
