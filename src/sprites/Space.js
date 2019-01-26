const POSSIBLE_PARTICLES = [
    'white',
    'blue',
    'green',
    'red',
    'yellow'
];

export default class Space extends Phaser.GameObjects.Graphics {
    constructor (scene, size, planet) {
        super(scene, {x: 0, y: 0});

        this.radius = 5;
        this.deathZone = planet;
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, size, size);
        this.level = 0;
        this.particleTypes = ['white'];

        this.hitCheck = (particle) => {
            const distq = (particle.x - this.deathZone.x) * (particle.x - this.deathZone.x) +
                (particle.y - this.deathZone.y) * (particle.y - this.deathZone.y);
            const collision = distq <= (this.deathZone.circle.radius + this.radius) * (this.deathZone.circle.radius + this.radius);
            if (collision) {
                const flareLvl = POSSIBLE_PARTICLES.findIndex(e => e === particle.frame.name);
                this.deathZone.collide('flare', flareLvl);
            }
        };

        this.particles = this.scene.add.particles('flares');

        this.emitter = this.particles.createEmitter({
            frame: this.particleTypes,
            speed: { min: -.1, max: .1 },
            lifespan: 7000,
            quantity: .3,
            scale: { min: .01, max: .1 },
            alpha: { start: 1, end: .5 },
            blendMode: 'ADD',
            emitZone: { source: this.emitZone },
            deathZone: { type: 'onEnter', source: this.deathZone.circle },
            deathCallback: this.hitCheck
        });
        scene.add.existing(this);
    }

    riseLevel() {
        if (this.level < POSSIBLE_PARTICLES.length - 1) {
            this.level++;
        }
        this.particleTypes.push(POSSIBLE_PARTICLES[this.level]);
    }
}
