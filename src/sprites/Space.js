const POSSIBLE_PARTICLES = [
    'white',
    'green',
    'red',
    'yellow',
    'blue'
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
                this.deathZone.grow(1);
            }
        };

        this.particles = this.scene.add.particles('flares');

        this.emitter = this.particles.createEmitter({
            frame: this.particleTypes,
            speed: { min: -.1, max: .1 },
            lifespan: 7000,
            quantity: .3,
            scale: { min: .1, max: .09 },
            alpha: { start: 1, end: .5 },
            blendMode: 'ADD',
            emitZone: { source: this.emitZone },
            deathZone: { type: 'onEnter', source: this.deathZone.circle },
            deathCallback: this.hitCheck
        });
        scene.add.existing(this);
    }

}
