import PlanetTexture from '../helpers/PlanetTexture';
import TerrainGenerator from '../helpers/TerrainGenerator';

var spicies = {
  'plant': {
    growth: height => (height-100) * 0.5,
    //growth: height => -1 * Math.pow(height-100,2) * 0.01 +5,
    reproduceThreshold: 100,
  }
}

class Planet extends Phaser.GameObjects.Image {
  constructor(scene, x, y, size) {
    super(scene, x, y);
    this.size = size;
    this.max = size - 1;
    this.map = [];

    this.terrainGenerator = new TerrainGenerator(this.size);
    for (let i in this.terrainGenerator.map) {
      this.map.push({
        height: this.terrainGenerator.map[i],
        spicies: {},
      })
    }

    this.planetTexture = new PlanetTexture(scene, this.size, 'planet');
    this.applyTerrain();
    this.setTexture('planet');
    this.setPosition(x, y);

    this.scene.time.addEvent({
      delay: 50,
      callback: this.updateLife,
      callbackScope: this,
      loop: true
    });

    this.map[1000].spicies = {
      'plant': {
        amount: 5,
      }
    };
  }

  get(x, y) {
    if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;
    return this.map[x + this.size * y];
  }

  applyTerrain() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let height = this.get(x, y).height;
        /*
        if (height < 0) {
          this.planetTexture.setPixel(x, y, 0, 0, 155, 255);
        }
        else if (height < 30) {
          this.planetTexture.setPixel(x, y, 0, 0, 255, 255);
        }
        else if (height < 50) {
          this.planetTexture.setPixel(x, y, 255, 255, 0, 255);
        }
        else if (height < 150) {
          this.planetTexture.setPixel(x, y, 100, 80, 20, 255);
        }
        else if (height < 200) {
          this.planetTexture.setPixel(x, y, 100, 100, 100, 255);
        }
        else {
          this.planetTexture.setPixel(x, y, 200, 200, 200, 255);
        }
        */
        if (height > 100) {
          this.planetTexture.setPixel(x, y, height, 0, 0, 255);
        } else {
          this.planetTexture.setPixel(x, y, 0, 0, 0, 255);
        }
      }
    }
    this.planetTexture.refresh();
  }

  drawLife() {
    for (let i=0; i<this.map.length; i++) {
      for (const [name, s] of Object.entries(this.map[i].spicies)) {
        if (Object.keys(this.map[i].spicies).length > 0) {
          this.planetTexture.setPixel(i%this.size, parseInt(i/this.size), 0, 255, 0, s.amount);
        }
      }
    }
    this.planetTexture.refresh();
  }

  updateLife() {
    for (let i=0; i<this.map.length; i++) {
      if (Object.keys(this.map[i].spicies).length > 0) {
        for (const [name, s] of Object.entries(this.map[i].spicies)) {
          s.amount += spicies[name].growth(this.map[i].height)
          if (s.amount > 255) {
            s.amount = 255;
          }
          if (s.amount > spicies[name].reproduceThreshold) {
            if (this.map[i+1] && !(name in this.map[i+1].spicies)) {
              this.map[i+1].spicies[name] = {
                amount: 20,
              };
            }
            if (this.map[i-1] && !(name in this.map[i-1].spicies)) {
              this.map[i-1].spicies[name] = {
                amount: 20,
              };
            }
            if (this.map[i+this.size] && !(name in this.map[i+this.size].spicies)) {
              this.map[i+this.size].spicies[name] = {
                amount: 20,
              };
            }
            if (this.map[i-this.size] && !(name in this.map[i-this.size].spicies)) {
              this.map[i-this.size].spicies[name] = {
                amount: 20,
              };
            }
          }
          if (s.amount <= 0) {
            delete this.map[i].spicies[name];
          }
        }
      }
    }
    this.drawLife();
  }
}

export default Planet;
