export default class Space extends Phaser.GameObjects.Graphics {
    constructor (scene, planet) {
        super(scene, {x: 0, y: 0});

        this.radius = 5;
        this.deathZone = planet;
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, scene.size, scene.size);
        this.level = 0;
        this.particleTypes = [];
        for (let i = 0; i <= 5; i++) {
            this.particleTypes.push(`rocks-${i}-0`);
            this.particleTypes.push(`rocks-${i}-1`);
        }

        this.hitCheck = (particle, color) => {
            const distq = (particle.x - this.deathZone.x) * (particle.x - this.deathZone.x) +
                (particle.y - this.deathZone.y) * (particle.y - this.deathZone.y);
            const collision = distq <= (this.deathZone.circle.radius + this.radius) * (this.deathZone.circle.radius + this.radius);
            if (collision) {
                const flareLvl = scene.POSSIBLE_PARTICLES.findIndex(e => e === color);
                this.deathZone.collide('flare', flareLvl);
            }
        };


        const white = scene.POSSIBLE_PARTICLES[0];
        this.emitter = {};
        this.createEmitter(white);

        scene.add.existing(this);
    }

    createEmitter(color) {
        const particles = this.scene.add.particles('rocks');
        const colorHex = this.scene.scene.get('UiScene').colors[color];
        this.emitter[color] = particles.createEmitter({
            frame: this.particleTypes,
            speed: { min: -.1, max: .1 },
            lifespan: 7000,
            quantity: .1,
            tint: [colorHex],
            scale: .1,
            alpha: { max: 1, min: .5 },
            rotate: {min:0, max: 359},
            blendMode: 'SUB',
                emitZone: { source: this.emitZone },
            deathZone: { type: 'onEnter', source: this.deathZone.circle },
            deathCallback: (p) => this.hitCheck(p, color)
        });
    }

    riseLevel(sub = false) {
        this.level += sub ? -1 : 1;
        if (this.level < 0) {
            this.level = 0;
        }
        if (this.level >= this.scene.POSSIBLE_PARTICLES.length) {
            this.level = this.scene.POSSIBLE_PARTICLES - 1;
        }

        const color = this.scene.POSSIBLE_PARTICLES[this.level];
        this.createEmitter(color);
    }
}
