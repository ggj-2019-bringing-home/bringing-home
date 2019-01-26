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

        this.deathZone = planet;
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, size, size);
        this.level = 0;
        this.particleTypes = ['white'];

        this.particles = this.scene.add.particles('flares');

        this.emitter = this.particles.createEmitter({
            frame: this.particleTypes,
            speed: { min: -.1, max: .1 },
            lifespan: 7000,
            quantity: .3,
            scale: { min: .1, max: .1 },
            alpha: { start: 1, end: .5 },
            blendMode: 'ADD',
            emitZone: { source: this.emitZone },
            deathZone: { type: 'onEnter', source: this.deathZone.circle }
        });
        scene.add.existing(this);
    }
}
