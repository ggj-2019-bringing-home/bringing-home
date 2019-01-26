import Planet from '../sprites/Planet.js';

class PlanetOnlyScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'PlanetOnlyScene'
    });
  }

  preload() {
  }

  create() {
    this.size = 65;
    let sw = this.game.config.width;
    let sh = this.game.config.height;

    this.planet = new Planet(this, sw/2, sh/2, this.size).setScale(1);
    this.children.add(this.planet);
  }

  update(time, delta) {
  }
}

export default PlanetOnlyScene;
