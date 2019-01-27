const RING_PER_TICK = .007
const TIMER_PER_TICK = .05

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
        this.size += value/4;
        if (this.size >= 32) {
            this.size = 32;
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
            if (this.values.white > 20) {
                let babol = this.values.white+this.values.blue;
                babol = this.values.white/babol;
                if (babol < .2)
                {
                    this.scene.sys.events.emit('message', '20% rock');
                }
                else if (babol < .4)
                {
                    this.scene.sys.events.emit('message', '40% rock');
                }
                else if (babol < .6)
                {
                    this.scene.sys.events.emit('message', '60% rock');
                }
                else if (babol < .8)
                {
                    this.scene.sys.events.emit('message', '80% rock');
                }
                else if (babol < .9)
                {
                    this.scene.sys.events.emit('message', 'planet is dead');
                }
            }
            if (this.values.white >= 20 && this.values.blue >= 20 && this.levelactual == 1) {
                this.levelactual++;
                this.scene.space.riseLevel();
                //this.scene.modeSw.pause();
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
